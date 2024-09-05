"use client";
import React, { useState } from 'react'
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const page = () => {
    const [value, setValue] = useState('');
  return (
    <div className='p-10 pt-16 md:p-24'>
        <div>
            <h2 className='font-medium text-2xl py-5'>
                Write your blog 
            </h2>
        </div>
         <form className="space-y-6"  >
            <div className="space-y-4">
                <div>
                    <h2 className='py-2 font-semibold'>Enter title</h2>
                    <input
                        id="title"
                        name="title"
                        type="title"
                        autoComplete="title"
                        required
                        className={` block w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md shadow-sm outline-none placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  `}
                        placeholder=" Enter Title"
                    />
                </div>
                
                <div>
                <h2 className='py-2 font-semibold'>Upload blog image</h2>
                    <input
                        type="file"    
                        className={` block w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md shadow-sm outline-none placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  `}
                        placeholder="your file"
                    />
                </div>
                <div className='py-3'>
                <h2 className='py-2 font-semibold'>Enter tags</h2>

                    <input
                        type="text"    
                        className={` block w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md shadow-sm outline-none placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  `}
                        placeholder="Enter tags"
                    />
                </div>
                <div className='rounded-xl '>
                <h2 className='py-2 font-semibold'>Write about your blog</h2>
                <ReactQuill className='rounded-lg  h-36' theme="snow" placeholder='Write Your content here...' value={value} onChange={setValue} />
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