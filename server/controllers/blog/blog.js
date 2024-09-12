import Blog from "../../model/blog.js";
import { User } from "../../model/user.js";
import { uploadonCloudinary } from "../../utils/cloudinary.js";

export const createBlog = async (req, res) => {
    try {
      
      const {title,tags,content}=JSON.parse(req.body.data)
      if (!title || !tags || !content) {
        return res.status(400).send('Please fill the form');
        }
      if (!req.file) {
        return res.status(400).send('No file uploaded.');
        }
        const {user}=req
        const localFilepath = req.file.path;

        const folder='Blogs'
        const cloudinaryResponse = await uploadonCloudinary(localFilepath,folder);
        console.log("user uid",user.uuid)
        if (cloudinaryResponse) {   

            const blog=await Blog.create({
                title,
                tags,
                blogImage:cloudinaryResponse.secure_url,
                content,
                author:user._id
            })

            await blog.save();

            await User.findByIdAndUpdate(user._id, {
                $push: { blogs: blog._id }
              });
            res.status(200).json({
                message: 'Blog Pulished Succesfully',
                blog
            });
        } else {
            res.status(500).send('Failed to upload file.');
        }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server Error' });
    }
  };

export const getBlogbyAuthor=async(req,res)=>{
    try {
        const {user}=req
        const userBlogs = await Blog.find({ author: user._id }).populate('author', 'name email profile');
        // console.log(userBlogs)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
}