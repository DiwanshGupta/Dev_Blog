import mongoose, { model } from "mongoose";
import jwt from "jsonwebtoken"

const userSchema=new mongoose.Schema({
    uuid:{
        type: String,
        required: true,
        unique: true,
      },
      name:{
        type: String,
        required: true,
      },
      profile:{
        type: String,
      },
      bio:{
        type: String,
      },
      email:{
        type: String,
        required: true,
        unique: true,
      },
      password:{
        type: String,
        required: true,
      },

},{timestamps:true});

const User = new mongoose.model( "User", userSchema );

const generatetoken = (user) => {
  // Define the payload with user information
  console.log("user",user)
  const payload = {
    uuid: user.uuid,
    name: user.name,
    email: user.email
  };

  // Generate the JWT token
  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: '24h' } // Token expires in 10 minutes
  );

  return token;
};
export  { User,generatetoken};