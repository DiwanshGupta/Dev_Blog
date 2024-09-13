"use client"
import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import instance from '../../utils/axios';
import Link from 'next/link';
const page = () => {
    const [blogs,setBlogs]=useState()
    const [loading, setLoading] = useState(true); 
   
    const fetchdata=async()=>{
        try {
            const response=await instance('/user/get/all/Blog')
            if(response.status===200){
                setBlogs(response.data)
                setLoading(false);
            }
        } catch (error) {
            console.log("error",error.message)
            setLoading(false);
        }      
    }
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
      

    useEffect(()=>{
        fetchdata()
    },[])

    if (loading) {
        return (
            <div className='flex items-center justify-center h-screen py-8'>
                <div className="loader"></div> {/* You can customize your loader styles here */}
            </div>
        );
    }
  return (
    <div className='' >
        <div className='bgimageLogin p-10 text-white  md:pt-24'>
        <div className='text-xl  font-semibold hover:text-green-750 text-center'>
        Unlock a world of insights—your search for the perfect blog starts here!
        </div>
        <div className='w-64  sm:w-96 m-auto px-5 relative my-3 bg-white rounded-full   justify-center'>
            <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`  w-[95%]  py-2 text-gray-900 outline-none placeholder-gray-400  sm:text-sm  `}
                placeholder="Search Blogs"
                />
                <span className='absolute right-2 top-2 text-blue-850 '>
                <FaSearch size={22} />
                </span>
             </div>
        </div>
        <div className='px-10 md:px-24 '>
        <div className='flex justify-start  text-white font-semibold py-3 md:flex-row'>
        <div className='flex flex-wrap items-center justify-center gap-3'>
        <div className=' p-1 cursor-pointer text-gray-600 px-5 bg-opacity-95 border-b-green-750 border-2 hover:text-green-750'>
        All</div>
        <div className=' p-1 cursor-pointer text-gray-600 px-5 bg-opacity-95 border-b-green-750 border-2 hover:text-green-750'>
        Food</div>
        <div className=' p-1 cursor-pointer text-gray-600 px-5 bg-opacity-95 border-b-green-750 border-2 hover:text-green-750'>
        Sports</div>
        <div className=' p-1 cursor-pointer text-gray-600 px-5 bg-opacity-95 border-b-green-750 border-2 hover:text-green-750'>
        Cosmo</div>
        <div className=' p-1 cursor-pointer text-gray-600 px-5 bg-opacity-95 border-b-green-750 border-2 hover:text-green-750'>
        Fashion</div>
        <div className=' p-1 cursor-pointer text-gray-600 px-5 bg-opacity-95 border-b-green-750 border-2 hover:text-green-750'>
        Travel</div>
        </div>
        </div>
        <div className='md:p-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3  '>
        {blogs?.map((item, index) => (
            <Link key={index} href={`/blog/${item.blogId}`}>
             <div className='flex p-3 justify-center m-auto  hover:shadow-md cursor-pointer rounded-md hover:bg-slate-100 hover:text-green-750    flex-col   gap-5  '>
             <div className='  w-full   rounded-md '>
             <img src={item.blogImage || '/assets/visax-5jgvVlkI0mw-unsplash.jpg'} className=' w-full object-cover h-48  rounded-md '/>
             </div>
             <div className='flex font-semibold flex-col  justify-between'>
                 <div className='text-blue-850'>
                 {item.title.slice(0,20)}
                 </div>
                 <div className='py-3 text-gray-400 text-xs w-full'>
                 <div dangerouslySetInnerHTML={{ __html: item.content.slice(0, 100) }} />
                 </div>
                 <div className='py-3 gap-3 text-gray-500 text-xs flex flex-wrap w-full'>
                {item.tags?.map((tag, tagIndex) => (
                    <div 
                    key={tagIndex} 
                    className='bg-slate-300 border-gray-400 border-[1px] rounded-full py-1 px-4'
                    >
                    {tag}
                    </div>
                ))}
                </div>
                 <div className='text-xs justify-between flex flex-row text-black' >
                 By {item?.author?.name}<span className='text-gray-400'> - {formattedDate(item?.createdAt)}</span>
                 </div>
             </div>
            </div>
        </Link>
        ))}
        </div>
        </div>
    </div>
  )
}

export default page