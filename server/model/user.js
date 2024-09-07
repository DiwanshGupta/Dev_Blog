import mongoose, { model } from "mongoose";

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
export default User;