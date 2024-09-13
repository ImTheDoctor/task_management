import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        if(!process.env.MONGO_URI) {
            throw new Error("MongoDB URI is not defined");
        }

        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB connected successfully");
    } catch (error) {
        console.error(error);
        process.exit(1)
    }
};

export default connectDB;