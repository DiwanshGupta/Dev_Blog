import Blog from "../model/blog.js";

export const userBlogExist = async (req, res, next) => {
    try {
      const { id } = req.params; 
      const { user } = req;   
      const blog = await Blog.findOne({ blogId: id });
        
      if (!blog) {
       return res.status(404).json({ error: 'Blog not found' });
      }
      const blogIdString = blog._id.toString();
      const userBlogIds = user.blogs.map(b => b._id.toString()); 
  
      console.log("blogId", blogIdString);
      console.log("User's Blog IDs:", userBlogIds); 
  
      const blogExists = userBlogIds.includes(blogIdString);
        console.log(blogExists)
      if (!blogExists) {
        return res.status(403).json({ error: 'You are not the author of this blog' });
      }
      req.blog=blogIdString 
      next();
    } catch (error) {
      console.error("Error in userBlogExist:", error);
      res.status(500).json({ error: 'Server Error' });
    }
  };
  