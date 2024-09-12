import jwt  from "jsonwebtoken";
import { User } from "../model/user.js";
import { config } from "../utils/config.js";

const jwt_secret=config.jwt_secret_key;

export const isAuthenticate=async(req,res,next)=>{
    const {ec_ls}=req.cookies;
    if(!ec_ls){
        return res.status(404).json({message:"Token not Found Please login"})
    }
    const decodeToken=jwt.verify(ec_ls,jwt_secret)
    const userExist=await User.findOne({uuid:decodeToken.uuid})
    if(!userExist){
        return res.status(404).json({message:"User Not Found"})
    }
    const userWithBlogs = await User.findById(userExist._id)
    .populate({  path: 'blogs',        
       model: 'Blog',});
      
    req.user=userWithBlogs;
    
    next()

}