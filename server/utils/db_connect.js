import mongoose from 'mongoose';
import {config}  from './config.js';

const mongoUrl=config.mongoUrl;
export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://dewanshgupta120:eFADzJvPbLg741H6@echothreads.0bcwt.mongodb.net/');
        console.log( 'MongoDB connected' );
    } catch ( error ) {
        console.error( 'Error connecting to MongoDB:', error.message );
        process.exit( 1 );
    }
};
