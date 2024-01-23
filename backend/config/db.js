import mongoose from "mongoose";

const connectDB= async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI,{
        retryWrites:false,
        serverSelectionTimeoutMS: 5000
      });
      
      // console.log("hello",process.env.MONGO_URI);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
   
    } catch (error) {
      console.log(`error: ${error.message}`);

    }
  };
  export default connectDB