import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!process.env.MONGODB_URL) {
    throw new Error("MONGODB_URL is missing");
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URL, {
      dbName: "semesterProject",
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  console.log("Database connected");

  return cached.conn;
};

export default connectDB;