import mongoose from 'mongoose';

export async function connectDB(uri) {
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri, {
    autoIndex: true, // để Mongoose tự tạo index từ schema
  });
  console.log('[DB] Connected');
}
