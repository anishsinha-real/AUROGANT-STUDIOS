import mongoose from "mongoose";
const designSchema=new mongoose.Schema({
 designId:{type:String,required:true,unique:true,index:true},
 user:{type:mongoose.Schema.Types.ObjectId,ref:"User",default:null,index:true},
 productCode:{type:String,required:true,index:true},
 color:{type:String,default:""},
 size:{type:String,default:""},
 quantity:{type:Number,default:1,min:1},
 views:{type:mongoose.Schema.Types.Mixed,default:{}},
 preview:{type:String,default:""},
 printFile:{type:String,default:""},
 status:{type:String,enum:["draft","saved","ordered","production","completed"],default:"draft",index:true},
 orderNumber:{type:String,default:"",index:true}
},{timestamps:true});
export default mongoose.model("Design",designSchema);