"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import instance from '../../utils/axios';

const Featured = () => {
    const [blogs,setBlogs]=useState([])
    const [loading, setLoading] = useState(true);
  
    const formattedDate = (data) => {
      
        if (!data) {
          return 'Invalid date';
        }
      
        const date = new Date(data);
      
        if (isNaN(date.getTime())) {
          return 'Invalid date';
        }
      const newDate=date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        timeZone: 'UTC' 
      });
        return newDate
      };

    const fetchData = async () => {
      try {
        const response = await instance('/user/get/all/Blog');
        if (response.status === 200) {
          setBlogs(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.log('error', error.message);
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);

    if (loading) {
        return (
            <div className='flex items-center justify-center h-screen py-8'>
                <div className="loader"></div> 
            </div>
        );
    }
      const firstBlog = blogs[0];
      const otherBlogs = blogs.slice(1, 4);

      
  return (
    <div className='md:p-12 p-3'>
        <div className=''>
        <div className='text-3xl font-extrabold '> Top Stories</div>
        <div className='grid grid-rows-1 grid-cols-1 md:grid-cols-2 gap-8  py-8'>
        {firstBlog && (
        <Link  href={`/blog/${firstBlog.blogId}`}>
        <div className='items-center w-[80%]    mt-2  justify-center m-auto' >
        <img src={firstBlog.blogImage} className='w-full h-48 object-cover rounded-lg'/>
        <div className='font-semibold w-4/5 text-base md:text-lg lg:text-2xl p-3'>{firstBlog.title}</div>
        <div className='flex flex-row font-semibold items-center text-sm gap-2'>
        <img src={firstBlog.author?.profile} className='rounded-full w-12 h-12  '/>
        By  {firstBlog.author?.name}<span className='text-gray-400'> - {formattedDate(firstBlog?.createdAt)}</span>
        </div>
        </div>
        </Link>
        )}
        <div className='flex flex-col mt-0  items-center justify-center  m-auto gap-1 w-[85%]'>     
        {otherBlogs.map((blog, index) => ( 
        <Link key={index} className='w-full' href={`/blog/${blog.blogId}`}>        
        <div    className='flex p-3  w-full hover:shadow-md cursor-pointer rounded-md hover:bg-slate-100 hover:text-green-750    flex-col lg:flex-row  gap-5  '>
            <div className='w-full h-48 sm:h-32   lg:w-2/5  rounded-md'>
            <img src={blog.blogImage} className='w-full h-full   object-cover  rounded-md' />
            </div>
            <div className='flex gap-3 font-semibold flex-col lg:w-3/5   justify-between'>
                <div className='text-gray-400 text-base'>
                {blog.title}
                </div>
                <div className='text-sm sm:text-base md:text-xs lg:text-base w-full'>
                <div dangerouslySetInnerHTML={{ __html: blog.content.slice(0, 80) }} />
                </div>
                <div className='text-xs sm:text-base justify-between flex flex-row text-black' >
                By {blog?.author?.name}<span className='text-gray-400'> - {formattedDate(blog?.createdAt)}</span>
                </div>
            </div>
        </div>
        </Link>))}
       
        </div>
        </div>
        <Link href={'/blog'}>
        <div className='  flex justify-center m-auto '>
        <span className='rounded-full bg-green-750 py-1 text-lg px-6 font-semibold text-white'>Explore more</span>
        </div>
        </Link>
        </div>
    </div>
  )
}

export default Featured