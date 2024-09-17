import express from "express"
import { upload } from "../../middleware/multer.js"
import { userBio, userProfile } from "../../controllers/user/user.js"
import { isAuthenticate } from "../../middleware/auth.js"
import { commentOnBlog, createBlog, deleteBlogById, getallBlog, getBlogById, getBlogpage, getsingleBlog, UpdateBlogById } from "../../controllers/blog/blog.js"
import { userBlogExist } from "../../middleware/userblog.js"

const userRouter=express.Router()

userRouter.post('/upload/profile',isAuthenticate,upload.single("profileImage"),userProfile)
userRouter.post('/update/userdata',isAuthenticate,userBio)
userRouter.post('/update/blog',isAuthenticate,upload.single("blogImg"),createBlog)
userRouter.get('/get/blog/:id',getsingleBlog)
userRouter.get('/get/all/Blog',getallBlog)
userRouter.post('/comment/blog/:id',isAuthenticate,commentOnBlog)
userRouter.post('/get/page/Blog',getBlogpage)
userRouter.get('/update/blog/:id',isAuthenticate,userBlogExist,getBlogById)
userRouter.post('/update/blog/:id',isAuthenticate,userBlogExist,UpdateBlogById)
userRouter.delete('/delete/blog/:id',isAuthenticate,userBlogExist,deleteBlogById)




export default userRouter