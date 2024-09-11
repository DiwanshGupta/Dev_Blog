import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true  
    },
    tags: {
        type: [String],  
    },
    blogImage: {
        type: String,    
    },
    content: {
        type: String,
        required: true  
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  
        required: true  
    }
}, { timestamps: true });  

const Blog = new mongoose.model( "Blog", blogSchema );

export default Blog