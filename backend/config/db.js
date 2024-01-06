import mongoose from "mongoose";

const connectDB= async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      // console.log("hello",process.env.MONGO_URI);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      // console.log("hi");
    } catch (error) {
      console.log(`error: ${error.message}`);
      // console.log("hii");
    }
  };
  export default connectDB