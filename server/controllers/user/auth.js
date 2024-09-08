import { customAlphabet } from "nanoid";
import {generatetoken, User} from "../../model/user.js";
import ErrorHandler from "../../utils/errorhandler.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { sendEmail } from "../../utils/sendEmail.js";
import { config } from "../../utils/config.js";


const verificationOptions = {
  httpOnly: true,
  maxAge: 10 * 60 * 1000,  
  sameSite: config.sameSite, 
  secure: config.nodeEnv === 'production',
};

const authOptions = {
  httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000, 
  sameSite: config.sameSite, 
  secure: config.nodeEnv === 'production',
};
const alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZ';  
const generateUserId = customAlphabet(alphabet, 8);
const jwt_secret=config.jwt_secret_key


export const signupController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExist=await User.findOne({email})
    if(userExist){
      return res.status(400).json({
        message: "Already a user. Please login",
      });
    }
    const existingSignupToken = req.cookies[`req_Ls${email}`];
    if (existingSignupToken) {
      const decodedToken = jwt.verify(existingSignupToken, jwt_secret);
      if (decodedToken.email === email) {
        return res.status(429).json({
          message: "Please try again after 10 minutes.",
        });
    }}

    const hashedPassword = await bcrypt.hash(password, 10);

    const secretCode = jwt.sign(
      { name, email ,hashedPassword},
      jwt_secret,
      { expiresIn: '10m' } 
     );

    const subject = "Welcome to EchoThreads";
    const emailResponse = await sendEmail(name, email, subject, secretCode);

    if (emailResponse.success) {   
      return res.status(201).cookie(`req_Ls${email}`,secretCode,verificationOptions).json({
        message: "Verification email sent to your Email.",
      });
    } else {
      return res.status(500).json({
        message: "Please try again after some time.",
        error: emailResponse.error.message,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};

export const verifyAccount=async(req,res)=>{
  try {

  const {token}=req.query;

  const cleanedToken = token.replace('verify-account-signup-', '');

  if (!token) {
    return res.status(400).json({ message: "Verification Code  missing.Please Signup" });
  }

  const decodedToken = jwt.verify(cleanedToken, jwt_secret);

  const userExist=await User.findOne({email:decodedToken.email})
    if(userExist){
      return res.status(400).json({
        message: "Already a user. Please login",
      });
    }
  if(!decodedToken){
    return res.status(500).json({message:"Unauthorized access"})
  }

  const verificationToken = req.cookies[`req_Ls${decodedToken.email}`];

  if (cleanedToken !== verificationToken) {
    return res.status(400).json({ message: "Invalid verification code." });
  }
  const authenticate = jwt.verify(verificationToken, jwt_secret);

  if(!authenticate){
    return res.status(400).json({ message: "Token expired or invalid." }); 
  }

  const id =generateUserId()
  const user=await User.create({
    uuid:id,
    name:authenticate.name,
    email:authenticate.email,
    password:authenticate.hashedPassword
  })
    const users={
      uuid:user.id,
      name:user.name,
      email:user.email
    }
  
      const sendToken=generatetoken(users);
      return res.status(201).cookie("ec_ls",sendToken,authOptions).json({message:"user Signup successfully"})
} catch (error) {
  return res.status(400).json({ error: error.message });
  }
}
export const loginuser=async(req,res)=>{
  try {
    const {email,password}=req.body;

    
  const userExist=await User.findOne({email})
  if(!userExist){
    return res.status(400).json({
      message: "User not found please Signin",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, userExist.password);
    
  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Incorrect password.",
    });
  }
      const users={
        uuid:userExist.uuid,
        name:userExist.name,
        email:userExist.email
      }
      const sendToken= generatetoken(users);
      return res.status(201).cookie("ec_ls",sendToken,authOptions).json({message:"user login successfully"})
  } catch (error) {
    return res.status(400).json({ error: error.message });

  }
}
export const getUser=async(req,res)=>{
  const {user}=req;
  return res.status(200).json(user);  
}
export const logoutUser = (req, res) => {
  req.session.destroy((err) => {
      if (err) {
          return res.status(500).json({ message: 'Failed to log out' });
      }
      res.clearCookie('ec_ls'); // Default cookie name for express-session
      return res.status(200).json({ message: 'Logged out successfully' });
  });
};