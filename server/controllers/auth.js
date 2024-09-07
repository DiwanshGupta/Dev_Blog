import { customAlphabet } from "nanoid";
import User from "../model/user.js";
import ErrorHandler from "../utils/errorhandler.js";

export const signupController=async(req,res)=>{
    console.log("request",req.body)
    try {
        const alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZ';  
        const generateUserId = customAlphabet(alphabet, 8);
        const {name,email,password}=req.body;
        const userExist=await User.findOne({email})
        if(userExist){
            return next(new ErrorHandler("User already exists", 400));
        }
        const user=await User.create({
            uuid:generateUserId(),
            name,
            email,
            password
        })
       return res.status( 201 ).json( {
            message: "Registration Succesfully",
            user
        } );
        }catch (error) {
            console.log(error)
            return res.status(400).json({ error: error.message });
    }
}