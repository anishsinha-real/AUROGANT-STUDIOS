import express from 'express';
import crypto from 'crypto';
import { findOrder, updateOrder } from '../utils/store.js';
import Order from '../models/Order.js';
const router=express.Router();

router.post('/create',async(req,res)=>{
 const {amount,receipt,orderId}=req.body;if(!orderId)return res.status(400).json({success:false,message:'Order ID is required.'});
 const order=process.env.MONGODB_URI?await Order.findOne({orderNumber:orderId}):await findOrder(orderId);if(!order)return res.status(404).json({success:false,message:'Order not found.'});
 const expected=Number(order.totals?.total||0);if(Math.round(Number(amount)||0)!==Math.round(expected))return res.status(400).json({success:false,message:'Payment amount does not match order.'});
 if(!process.env.RAZORPAY_KEY_ID||!process.env.RAZORPAY_KEY_SECRET)return res.status(503).json({success:false,message:'Online payments are not configured.'});
 const auth=Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString('base64');
 const response=await fetch('https://api.razorpay.com/v1/orders',{method:'POST',headers:{Authorization:`Basic ${auth}`,'Content-Type':'application/json'},body:JSON.stringify({amount:Math.round(expected*100),currency:'INR',receipt:receipt||orderId})});
 const data=await response.json();if(!response.ok)return res.status(502).json({success:false,message:data.error?.description||'Razorpay order creation failed.'});
 if(process.env.MONGODB_URI) await Order.updateOne({_id:order._id},{$set:{razorpayOrderId:data.id,status:'payment_pending',paymentStatus:'pending'}}); else await updateOrder(orderId,{razorpayOrderId:data.id,status:'payment_pending',paymentStatus:'pending'});
 res.json({success:true,mode:'live',keyId:process.env.RAZORPAY_KEY_ID,orderId:data.id,amount:data.amount,currency:data.currency});
});
router.post('/verify',async(req,res)=>{
 const {orderId,paymentId,signature,razorpayOrderId}=req.body;const order=process.env.MONGODB_URI?await Order.findOne({orderNumber:orderId}):await findOrder(orderId);
 if(!order)return res.status(404).json({success:false,verified:false,message:'Order not found.'});
 if(!process.env.RAZORPAY_KEY_SECRET)return res.status(503).json({success:false,verified:false,message:'Payment verification is not configured.'});
 const expected=crypto.createHmac('sha256',process.env.RAZORPAY_KEY_SECRET).update(`${razorpayOrderId}|${paymentId}`).digest('hex');
 const verified=crypto.timingSafeEqual(Buffer.from(expected),Buffer.from(String(signature||'')));
 if(process.env.MONGODB_URI) await Order.updateOne({_id:order._id},{$set:verified?{paymentStatus:'paid',status:'confirmed',razorpayPaymentId:paymentId}:{paymentStatus:'failed',status:'payment_failed'}}); else await updateOrder(orderId,verified?{paymentStatus:'paid',status:'confirmed',razorpayPaymentId:paymentId}:{paymentStatus:'failed',status:'payment_failed'});
 res.json({success:true,verified});
});
router.post('/failed',async(req,res)=>{const order=await findOrder(req.body.orderId);if(!order)return res.status(404).json({success:false});await updateOrder(order.id,{paymentStatus:'failed',status:'payment_failed',updatedAt:new Date().toISOString()});res.json({success:true})});
export default router;