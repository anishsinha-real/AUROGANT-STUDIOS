import express from 'express';
import crypto from 'crypto';
import { createOrder, findOrder } from '../utils/store.js';
import { AUR_PRODUCTS } from '../utils/productCatalog.js';

const router = express.Router();
const makeId=()=>`AUR-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
const GST=Number(process.env.GST_RATE||5), FREE=Number(process.env.FREE_SHIPPING_ABOVE||999), SHIPPING=Number(process.env.STANDARD_SHIPPING||99);

function calculate(items){
 if(!Array.isArray(items)||!items.length) throw new Error('At least one item is required.');
 let subtotal=0;
 const normalized=items.map(raw=>{
  const p=AUR_PRODUCTS.find(x=>x.code===String(raw.code||'').toUpperCase());
  if(!p) throw new Error(`Product not found: ${raw.code}`);
  const quantity=Math.max(1,Math.min(100,Number(raw.quantity)||1));
  const objects=Math.max(0,Math.min(20,Number(raw.designObjectCount)||0));
  const print=objects?99+25*Math.max(0,objects-1):0;
  const price=Number(p.salePrice||p.price)+print; subtotal+=price*quantity;
  return {...raw,code:p.code,name:p.name,basePrice:Number(p.salePrice||p.price),unitPrice:price,printCharge:print,quantity};
 });
 const shipping=subtotal>=FREE?0:SHIPPING, gst=Math.round(subtotal*GST/100);
 return {items:normalized,totals:{subtotal,shipping,gst,total:subtotal+shipping+gst}};
}
router.post('/',async(req,res)=>{
 try{
  const {customer,paymentMethod='cod'}=req.body;
  if(!customer?.name||!customer?.phone||!customer?.address) return res.status(400).json({success:false,message:'Customer details are incomplete.'});
  if(!['cod','online'].includes(paymentMethod)) return res.status(400).json({success:false,message:'Invalid payment method.'});
  const calculated=calculate(req.body.items);
  const order=await createOrder({id:makeId(),customer,items:calculated.items,totals:calculated.totals,paymentMethod,status:paymentMethod==='cod'?'confirmed':'payment_pending',paymentStatus:'pending',razorpayOrderId:'',razorpayPaymentId:'',tracking:{carrier:'',trackingNumber:'',trackingUrl:''},createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()});
  res.status(201).json({success:true,order});
 }catch(e){res.status(400).json({success:false,message:e.message||'Unable to create order.'})}
});
router.get('/:id',async(req,res)=>{const order=await findOrder(req.params.id);if(!order)return res.status(404).json({success:false,message:'Order not found'});res.json({success:true,order})});
export {calculate};
export default router;