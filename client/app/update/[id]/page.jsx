"use client";
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { useParams, useRouter } from 'next/navigation';
import instance from '../../../utils/axios';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const page = () => {
    const router = useRouter();
    const params=useParams()
    const { id } = params
    console.log("id",id)
    const user=useSelector((state)=>state.user?.user)
    const [form, setForm] = useState({
        title: '',
        tags: [],
        content: ''
    });
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(true);

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

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setSelectedImage(file);   
    
        }
      };

    const fetchBlogData=async()=>{
        try {
            const response=await instance(`/user/update/blog/${id}`)
            console.log(response)

        } catch (error) {
            setLoading(false);
            console.error("Error uploading image:", error);
            Swal.fire({
                title: 'Some error occured',
                text:   error.response?.data?.message || 'try again after Sometime',
                icon: 'warning',
              })  
        }
    }

    const handleContentChange = (value) => {
        setForm(prevForm => ({
            ...prevForm,
            content: value
        }));
    };
    const handleSubmit = async(e) => {
        e.preventDefault();
                if (!form.title || !form.content) {
                    Swal.fire({
                        title: 'Form Incomplete',
                        text: 'Please fill out all form fields.',
                        icon: 'warning',
                    });
                    return;
                }
            
                if (!selectedImage) {
                    Swal.fire({
                        title: 'Image Missing',
                        text: 'Please upload the image.',
                        icon: 'warning',
                    });
                    return;
                }
            const formData = new FormData();
            formData.append("blogImg", selectedImage); 
            formData.append("data", JSON.stringify(form));  
            setLoading(true);
            try {
                const response=await instance.post("/user/update/blog",formData,{
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log(response.data)
                if(response.status===200){
                    setLoading(false);
                    Swal.fire({
                        title: 'Success',
                        text: 'Blog Published successfully!',
                        icon: 'success',
                    });
                }


            } catch (error) {
                setLoading(false);
                console.error("Error uploading image:", error);
                Swal.fire({
                    title: 'Some error occured',
                    text:   error.response?.data?.message || 'try again after Sometime',
                    icon: 'warning',
                  })  
            }
       
    };
    
    useEffect(() => {
  
        fetchBlogData()
      }, []);
    
    if (loading) {
        return (
          <div className='flex  items-center w-fit  h-screen py-8  justify-center m-auto'>
            <div className="loader items-center justify-center"></div>
          </div>
        );
      }
  return (
    <div className='p-10 pt-16 md:p-24'>
        <div>
            <h2 className='font-medium text-2xl py-5'>
                Write your blog 
            </h2>
        </div>
         <div className="space-y-6"   >
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
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className={`w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md shadow-sm outline-none placeholder-gray-400 sm:text-sm`}
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
                <button onClick={handleSubmit}  className='rounded-full bg-green-750 p-2 text-base px-8 font-semibold text-white'>Publish your Blog</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default page