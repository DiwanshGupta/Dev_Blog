import express from "express"
import { getUser, loginuser, signupController, verifyAccount } from "../../controllers/user/auth.js"
import { isAuthenticate } from "../../middleware/auth.js"
const authRouter=express.Router()

authRouter.post('/signup',signupController)
authRouter.post('/login',loginuser)
authRouter.get('/verify-account',verifyAccount)
authRouter.get('/getUser',isAuthenticate, getUser)
authRouter.get('/logout',verifyAccount)


export default authRouter