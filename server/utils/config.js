import dotenv from 'dotenv';

dotenv.config();

export const config={
    jwt_secret_key:process.env.JWT_SECRET,
    mongoUrl:process.env.MONGO_URL
}