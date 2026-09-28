import mongoose from "mongoose";
const orderItemSchema=new mongoose.Schema({code:{type:String,required:true},name:{type:String,required:true},image:{type:String,default:""},price:{type:Number,required:true,min:0},basePrice:{type:Number,default:0},printCharge:{type:Number,default:0},quantity:{type:Number,required:true,min:1},size:{type:String,default:""},color:{type:String,default:""},designId:{type:String,default:""},preview:{type:String,default:""}},{_id:false});
const orderSchema=new mongoose.Schema({
 orderNumber:{type:String,required:true,unique:true,index:true},
 user:{type:mongoose.Schema.Types.ObjectId,ref:"User",default:null,index:true},
 customer:{name:String,email:String,phone:String,address:String,city:String,state:String,pincode:String},
 items:[orderItemSchema],
 totals:{subtotal:{type:Number,required:true},shipping:{type:Number,default:0},gst:{type:Number,default:0},total:{type:Number,required:true}},
 paymentMethod:{type:String,enum:["cod","online"],required:true},
 paymentStatus:{type:String,enum:["pending","paid","failed","refunded"],default:"pending",index:true},
 status:{type:String,enum:["payment_pending","payment_failed","confirmed","processing","shipped","delivered","cancelled"],default:"payment_pending",index:true},
 razorpayOrderId:{type:String,default:"",index:true},
 razorpayPaymentId:{type:String,default:""},
 tracking:{carrier:{type:String,default:""},trackingNumber:{type:String,default:""},trackingUrl:{type:String,default:""},estimatedDelivery:{type:String,default:""}}
},{timestamps:true});
orderSchema.index({createdAt:-1});
export default mongoose.model("Order",orderSchema);