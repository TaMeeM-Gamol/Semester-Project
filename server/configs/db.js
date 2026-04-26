import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Mongo URL:", process.env.MONGODB_URL);

    await mongoose.connect(process.env.MONGODB_URL, {
           dbName: "semesterProject",
       });

    console.log("Database connected");
  } catch (error) {
    console.log("MongoDB Error:", error.message);
  }
};

export default connectDB;