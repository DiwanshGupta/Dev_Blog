import express from "express"
import { upload } from "../../middleware/multer.js"
import { userProfile } from "../../controllers/user/user.js"
import { isAuthenticate } from "../../middleware/auth.js"
const userRouter=express.Router()

userRouter.post('/upload/profile',isAuthenticate,upload.single("profileImage"),userProfile)


export default userRouter