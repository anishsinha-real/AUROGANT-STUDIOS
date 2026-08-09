import mongoose from 'mongoose';

export async function connectDB() {
  if (!process.env.MONGODB_URI) {
    console.log('MongoDB URI not configured — using JSON order store.');
    return false;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: 'aurogant' });
    console.log('MongoDB connected.');
    return true;
  } catch (error) {
    console.error('MongoDB connection failed — using JSON order store:', error.message);
    return false;
  }
}
