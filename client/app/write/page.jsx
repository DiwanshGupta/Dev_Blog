"use client";
import React, { useState } from 'react'
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const page = () => {
    const [form, setForm] = useState({
        title: '',
        tags: [],
        content: ''
    });
    const [selectedImage, setSelectedImage] = useState(null) 


    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };
    const handleTagsChange = (e) => {
        setForm(prevForm => ({
            ...prevForm,
            tags: e.target.value.split(',').map(tag => tag.trim())
        }));
    };

    const handleFileChange = (e) => {
           const file = e.target.files[0];
     
        if (file) {
            // Handle the file, e.g., upload it or preview it
            console.log('Selected file:', file);
            setSelectedImage(file)
          }
    };
 

    const handleContentChange = (value) => {
        setForm(prevForm => ({
            ...prevForm,
            content: value
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        console.log(selectedImage);
    };
  return (
    <div className='p-10 pt-16 md:p-24'>
        <div>
            <h2 className='font-medium text-2xl py-5'>
                Write your blog 
            </h2>
        </div>
         <form className="space-y-6"  onClick={handleSubmit}  >
            <div className="space-y-4">
                <div>
                    <h2 className='py-2 font-semibold'>Enter title</h2>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        autoComplete="title"
                        required
                        value={form.title}
                        onChange={handleChange}
                        className={` block w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md shadow-sm outline-none placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  `}
                        placeholder=" Enter Title"
                    />
                </div>
                
                <div>
                <label htmlFor="image" className="cursor-pointer">
                <h2 className='py-2 font-semibold'>Upload blog image</h2>
                </label>
                    <input
                        type='file'
                        // value={selectedImage}
                        id="image"
                        name="image"
                        accept="image/*"      
                        onChange={handleFileChange}
                        className={`  w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md shadow-sm outline-none placeholder-gray-400 sm:text-sm  `}
                        placeholder="your file"
                    />
                </div>
                <div className='py-3'>
                <h2 className='py-2 font-semibold'>Enter tags</h2>

                    <input
                        type="text"    
                        onChange={handleTagsChange}
                        value={form.tags.join(', ')}
                        className={` block w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md shadow-sm outline-none placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  `}
                         placeholder="Enter tags (comma-separated)"
                    />
                </div>
                <div className='rounded-xl '>
                <h2 className='py-2 font-semibold'>Write about your blog</h2>
                <ReactQuill className='rounded-lg  h-36' theme="snow" placeholder='Write Your content here...' value={form.content}  onChange={handleContentChange} />
                </div>
                <div className=' pt-20  flex justify-center m-auto '>
                <span className='rounded-full bg-green-750 p-3 text-xl px-8 font-semibold text-white'>Publish your Blog</span>
                </div>
            </div>
        </form>
    </div>
  )
}

export default page