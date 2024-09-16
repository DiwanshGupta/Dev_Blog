import { randomBytes } from 'crypto';
import Blog from "../../model/blog.js";
import { User } from "../../model/user.js";
import { uploadonCloudinary } from "../../utils/cloudinary.js";
import Comment from "../../model/comments.js";

const generateBlogId = () => randomBytes(12).toString('hex');

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
          const blogId = generateBlogId();
          const blog=await Blog.create({
                blogId,
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


export const getsingleBlog=async(req,res)=>{
      const {id}=req.params;

      console.log("id",id)
      try {
        const blog = await Blog.findOne({ blogId: id }).populate('author'); 
          if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
          }
          
          const updatedBlog = await Blog.findById(blog._id)
          .populate({
            path: 'comments',  
            populate: {
              path: 'userId',
              select: '_id name profile',  
            }
          })
          .populate('author', 'name profile');  
          res.status(200).json(updatedBlog);
      } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Server Error' });
      }
}
export const getallBlog=async(req,res)=>{
  try {
    const blog=await Blog.find().populate('author')
    return res.status(200).json(blog)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

export const commentOnBlog=async(req,res)=>{
  const {id}=req.params;
  const {user}=req;
  const {comment}=req.body;
  console.log("comment",comment,id)
  try {
    if(!comment){
      return res.status(400).json({message:"Please Write Comment"})
    }
    const blog = await Blog.findOne({ blogId: id });
      if(!blog){
      return res.status(400).json({message:"Do not try to mess dude"})
    }
    console.log("blps",blog)
    const newComment = await Comment.create({
      blogId: blog._id,
      userId: user._id,
       comment, 
    });
    

      await Blog.findByIdAndUpdate(
        blog._id,
        { $push: { comments: newComment._id } },
        { new: true } 
    );

    const updatedBlog = await Blog.findById(blog._id)
      .populate({
        path: 'comments',  
        populate: {
          path: 'userId',
          select: '_id name profile',  
        }
      })
      .populate('author', 'name profile');  

    return res.status(201).json(updatedBlog)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

export const getBlogpage = async (req, res) => {
  try {
    const { search, query, page , limit = 2 } = req.body;  
    const skip = (page - 1) * limit; 

    console.log("quesry",query)
    let filter = {};
    if (search) {
      filter = { title: { $regex: search, $options: 'i' } }; 
    }

    
    const blogs = await Blog.find(filter)
      .skip(skip)
      .limit(limit)
      .exec();

    
    const total = await Blog.countDocuments(filter);
    res.status(200).json({
      success: true,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      blogs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blogid=req.blog
    console.log("is",blogid)
    const blog = await Blog.findOne({blogId:id});

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.status(200).json({ success: true, blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};