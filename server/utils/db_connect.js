import mongoose from 'mongoose';
import {config}  from './config.js';

const mongoUrl=config.mongoUrl;
export const connectDB = async () => {
    try {
        await mongoose.connect( mongoUrl);
        console.log( 'MongoDB connected' );
    } catch ( error ) {
        console.error( 'Error connecting to MongoDB:', error.message );
        process.exit( 1 );
    }
};