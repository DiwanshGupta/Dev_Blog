"use client"
import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import instance from '../../utils/axios';
import Link from 'next/link';
import {  useRouter, useSearchParams } from 'next/navigation';
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const BlogData = () => {
    const searchParams = useSearchParams();
    const page = Number(searchParams.get('page')) || 1;
    const router=useRouter()
    const [blogs,setBlogs]=useState()
    const [loading, setLoading] = useState(true); 
    const user=useSelector((state)=>state.user?.user)
    const [search,setSearch]=useState('')
    const [totalPages, setTotalPages] = useState(0);
    const [likedBlogs, setLikedBlogs] = useState({});
    const fetchdata=async(page)=>{
        try {
          const response = await instance.post('/user/get/page/Blog', { page,search },
            {
              headers: {
                "Content-Type": "application/json"
              },
            } 
          );
          if (response.status === 200) {
            setBlogs(response.data.blogs);
            console.log(response.data.blogs);
            const blogsArray = Array.isArray(response.data.blogs) ? response.data.blogs : [];
            const initialLikes = blogsArray.reduce((acc, blog) => {
              acc[blog._id] = {
                liked:blog.likes.includes(user?._id),
              count: blog.likes.length }
              return acc;
            }, {});
            setLikedBlogs(initialLikes);
        
            setTotalPages(response.data.totalPages);
            setCurrentPage(response.data.currentPage);
             setLoading(false);
          }
        } catch (error) {
            console.log("error",error.message)
            setLoading(false);
        }      
    }
    const handleLike = async (blogId,itemId) => {

      if (!user) {
        Swal.fire({
          title: 'Unauthorized',
          text: 'Please login to like the blogs',
          icon: 'warning',
        })
      return;
      }
    
      try {
        const response = await instance.post(`/user/blogs/${blogId}/like`);
        
        const updatedLikes = response.data.likes;
        const newCount = updatedLikes.length;
        setLikedBlogs((prevLikes) => ({
          ...prevLikes,
          [itemId]: {liked:updatedLikes.includes(user._id),
            count: newCount, 
          } 
        }));
      } catch (error) {
        console.error('Error liking the blog:', error);
        setLikedBlogs((prevLikes) => ({
          ...prevLikes,
          [blogId]: wasLiked, 
        }));
      }
    };
    
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

      const handleSearch=()=>{
        console.log("sas",search)
        router.push(`?search=${search}`); 
      }

      const handlePageChange = (page) => {
        router.push(`?page=${page}`); 
      };
    

      const clearParams = () => {
        router.push({ pathname: router.pathname });
      };
      useEffect(() => {
 
        const timeoutId = setTimeout(() => {
          fetchdata(page);
        }, 500);
    
        return () => clearTimeout(timeoutId);  
      }, [searchParams]);

    if (loading) {
        return (
            <div className='flex items-center justify-center h-screen py-8'>
                <div className="loader"></div> 
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
                  id="search"
                  name="search"
                  type="search"
                  value={search}
                  onChange={(e)=>setSearch(e.target.value)}
                  required
                  className={`  w-[95%]  py-2 text-gray-900 outline-none placeholder-gray-400  sm:text-sm  `}
                  placeholder="Search Blogs"
                  />
                  <button onClick={handleSearch} className='absolute right-2 top-2 text-blue-850 '>
                  <FaSearch size={22} />
                  </button >
          </div> 
        </div>
        <div className='px-10 md:px-24 '>

        <div className='md:p-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3  '>
        {blogs?.map((item, index) => (
            // <Link key={index} href={`/blog/${item.blogId}`}>
             <div key={index} className='flex p-3 justify-center m-auto  hover:shadow-md cursor-pointer rounded-md hover:bg-slate-100 hover:text-green-750    flex-col   gap-5  '>
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
                <div className='text-xs justify-between flex flex-row text-black'>
                <button className='flex-row flex items-center gap-3' onClick={() => handleLike(item.blogId,item._id)}>
                {likedBlogs[item._id].liked ? (
                  <FaHeart size={20} color='red' />
                ) : (
                  <FaRegHeart size={20} color='red' />
                )}
                <span>{likedBlogs[item._id]?.count || 0} Likes</span>
              </button>
                    <span className='text-gray-400'> - {formattedDate(item?.createdAt)}</span>
                  </div>
             </div>
            </div>
        // </Link>
        ))}
        </div>
        <div className='justify-center my-5 flex items-center w-full'>
            <nav aria-label="Page navigation">
              <ul className="flex items-center -space-x-px h-10 text-base">
                <li>
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
                  >
                    Previous
                  </button>
                </li>
                {[...Array(totalPages)].map((_, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handlePageChange(index + 1)}
                      className={`flex items-center justify-center px-4 h-10 leading-tight ${page === index + 1 ? 'bg-green-750 text-white' : 'text-gray-500 bg-white'} border border-gray-300 hover:bg-gray-100 hover:text-gray-700`}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
        </div>
      </div>
    </div>
  )
}

export default BlogData