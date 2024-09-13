import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    blogId:{
        type: String,
        required: true,  
        unique: true,
    },
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
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }]
}, { timestamps: true });  

const Blog = new mongoose.model( "Blog", blogSchema );

export default Blog