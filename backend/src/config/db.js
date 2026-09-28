import mongoose from 'mongoose';
export async function connectDB(){
 if(!process.env.MONGODB_URI){console.log('MongoDB URI not configured — using JSON fallback for local development.');return false;}
 try{await mongoose.connect(process.env.MONGODB_URI,{dbName:'aurogant'});console.log('MongoDB connected.');return true;}
 catch(error){console.error('MongoDB connection failed:',error.message);if(process.env.NODE_ENV==='production')throw error;console.log('Using JSON fallback for local development.');return false;}
}