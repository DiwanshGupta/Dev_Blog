import express from "express"
import { signupController } from "../controllers/auth.js"
const authRouter=express.Router()

authRouter.post('/signup',signupController)

export default authRouter