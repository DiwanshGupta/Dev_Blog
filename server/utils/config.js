import dotenv from 'dotenv';

dotenv.config();

export const config={
    frontend_url:process.env.FrontEndURl,
    jwt_secret_key:process.env.JWT_SECRET,
    mongoUrl:process.env.MONGO_URL,
    sameSite:process.env.SAME_SITE,
    nodeEnv:process.env.NODE_ENV
}