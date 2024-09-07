import mongoose from 'mongoose';
import env from "dotenv";
env.config()
const mongoUrl=process.env.MONGO_URL
export const connectDB = async () => {
    try {
        await mongoose.connect( mongoUrl);
        console.log( 'MongoDB connected' );
    } catch ( error ) {
        console.error( 'Error connecting to MongoDB:', error.message );
        process.exit( 1 );
    }
};