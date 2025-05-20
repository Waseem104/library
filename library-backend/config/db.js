import mongoose from "mongoose";

let connection = null;

const connectDB = async () => {
  try {
    if (connection) {
      return connection;
    }
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    // console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // console.log("Error connecting to mongoose:", error.message);
    process.exit(1);
  }
};

export default connectDB;
