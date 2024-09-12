import express from "express"
import { upload } from "../../middleware/multer.js"
import { userBio, userProfile } from "../../controllers/user/user.js"
import { isAuthenticate } from "../../middleware/auth.js"
import { createBlog, getsingleBlog } from "../../controllers/blog/blog.js"
const userRouter=express.Router()

userRouter.post('/upload/profile',isAuthenticate,upload.single("profileImage"),userProfile)
userRouter.post('/update/userdata',isAuthenticate,userBio)
userRouter.post('/update/blog',isAuthenticate,upload.single("blogImg"),createBlog)
userRouter.post('/get/blog/:id',isAuthenticate,getsingleBlog)


export default userRouter