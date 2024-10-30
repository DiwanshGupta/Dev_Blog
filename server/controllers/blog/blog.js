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
    const { search,  page , limit = 2 } = req.body;  
    const skip = (page - 1) * limit; 

    let filter = {};
    if (search) {
      filter = { 
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { tags: { $regex: search, $options: 'i' } }
        ]
      }; 
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

export const UpdateBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blogid=req.blog
    const {title,tags,content}=req.body
    if (!title || !tags || !content) {
      return res.status(400).send('Please fill the form');
    }
    
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogid,
      { title, tags, content },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    return res.status(200).json({ success: true, blog: updatedBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};
export const deleteBlogById=async(req,res)=>{
  try {
    const blogid=req.blog;
    const {user}=req;
  
    const deletedBlog = await Blog.findByIdAndDelete(blogid);

    if (!deletedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $pull: { blogs: blogid } },
      { new: true }
    );
    console.log("Updated User:", updatedUser);
    return res.status(200).json({ success: true, message: 'Blog deleted successfully' });

} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}
export const likeBlog = async (req, res) => {
  try {
    const { blogId } = req.params; 
    const userId = req.user ? req.user._id : null;  
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Please log in to like this blog.' });
    }

    // Find the blog by ID
    console.log(blogId)
    const blog = await Blog.findOne({ blogId: blogId });
    console.log(blog)
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    // Check if the user has already liked the blog
    const hasLiked = blog.likes.includes(userId);

    if (hasLiked) {
      // If the user has liked, remove the like (unlike)
      blog.likes = blog.likes.filter((id) => id.toString() !== userId.toString());
    } else {
      // If the user has not liked, add their like
      blog.likes.push(userId);
    }

    await blog.save();  

    res.status(200).json({ success: true,likes: blog.likes, likesCount: blog.likes.length, liked: !hasLiked });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};