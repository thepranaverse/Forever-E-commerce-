import mongoose from 'mongoose';

// connect our mongoose package with atlas server
const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};
export default connectDB;