import express from "express"
import { upload } from "../../middleware/multer.js"
import { userBio, userProfile } from "../../controllers/user/user.js"
import { isAuthenticate } from "../../middleware/auth.js"
const userRouter=express.Router()

userRouter.post('/upload/profile',isAuthenticate,upload.single("profileImage"),userProfile)
userRouter.post('/update/userdata',isAuthenticate,userBio)

export default userRouter