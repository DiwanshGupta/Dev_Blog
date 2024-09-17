"use client"
import React, { useEffect, useState } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import UpdateProfile from "../../components/UpdateProfile/updateProfile"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { SiPeakdesign } from "react-icons/si";
import { FaRegEdit } from 'react-icons/fa'
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2'
import { currentuser } from '../../redux/feature/user/api'
import instance from '../../utils/axios'

const page = () => {
  const dispatch = useDispatch();
  const user=useSelector((state)=>state.user?.user)
  const loading=useSelector((state)=>state.user?.loading)
    const router = useRouter();
    // useEffect(() => {
    //   console.log("g",loading)
    //   if (!user ) {
    //     console.log("loadig",loading)
    //     router.push('/login');
    //   }
    // }, [loading, user, router]);
    const deleteBlog = async (id) => {
      // Show the confirmation popup
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
      });
    
      // Proceed only if the user confirmed
      if (result.isConfirmed) {
        try {
          const response = await instance.delete(`/user/delete/blog/${id}`);
          if (response.status === 200) {
            dispatch(currentuser()); 
            Swal.fire({
              title: 'Deleted!',
              text: 'Blog has been deleted.',
              icon: 'success',
            });
          }
        } catch (error) {
          console.error("Error deleting blog:", error);
          Swal.fire({
            title: 'Some error occurred',
            text: error.response?.data?.message || 'Try again later',
            icon: 'error',
          });
        }
      }
    };
    
    if (loading) {
      return (
        <div className='flex  items-center w-fit  h-screen py-8  justify-center m-auto'>
          <div className="loader items-center justify-center"></div>
        </div>
      );
    }
  return (
    <>
    <div className='w-full m-0 h-52'>
        <img src='/assets/Untitled-design.png' alt='vector-rectangle' className='w-full h-full'/>
    </div>
    <div className='md:p-12 p-3 w-4/5 justify-center m-auto relative'>
        <div className='left-[4%] right-[4%]   -top-16   rounded-lg absolute   text-center p-3 items-center bg-white'>
          <img src={user?.profile ? user.profile : '/assets/blank-profile-picture-973460_640.webp'} 
              alt='profile' 
              className='w-16 my-1 object-cover select-none h-16 justify-center m-auto rounded-full' 
          />
            <h2 className='text-xl font-bold py-3 capitalize'>{user?.name}</h2>
            <p className='text-sm font-medium w-full md:w-2/3 justify-center m-auto pb-3'>
            {user?.bio ? (user.bio.trim() === "" ? "Nothing to see here" : user.bio) : "Nothing to see here"}
            </p>
        </div>
        <div className='md:mt-24 mt-48 w-full  py-3'>
            <UpdateProfile/>
            <h2 className='font-bold text-2xl '>Author blogs</h2>
        </div>
        {user?.blogs && user.blogs.length > 0 ?
        <div className='grid grid-rows-1 grid-cols-1 sm:grid-cols-2 gap-8  py-8'>
        {user?.blogs.map((item, index) => (
          <div  key={index} className='flex p-3 justify-center m-auto hover:shadow-md cursor-pointer rounded-md hover:bg-slate-100 hover:text-green-750 flex-col lg:flex-row gap-5'>
            <div className='w-full h-36   lg:w-2/5  rounded-md'>
              <img src={item.blogImage} alt={item.title} className='w-full h-full   object-cover  rounded-md' />
            </div>
            <div className='flex  font-semibold lg:w-3/5 flex-col justify-between gap-1'>
              <div className='text-gray-400 flex flex-row justify-between'>
                <div>
                {item.title.slice(0,20)}
                </div>
                <div className=' flex flex-row gap-5 items-center'>
                <Link className='hover:text-green-750' href={`/update/${item.blogId}`}>
                <FaRegEdit  size={15} />
                </Link>
                <button onClick={()=>deleteBlog(item.blogId)}>
                <MdDelete size={15} />
                </button>
                </div>
              </div>
              <div className='text-sm sm:text-base md:text-sm w-full'>
              <Link key={index} href={`/blog/${item.blogId}`}>
                <div dangerouslySetInnerHTML={{ __html: item.content.slice(0, 110) }} />
              </Link>
              </div>
              <div className='text-xs sm:text-sm justify-between flex flex-row text-black'>
                By {user.name} <span className='text-gray-400'> - {new Date(item.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
        </div>:
        <div className=' justify-center h-60 flex flex-col items-center m-auto w-full '>
        <span ><SiPeakdesign size={55} /></span>
        <span className='font-semibold'>Write your 1st Blog</span>
        <Link href={'/write'} className='my-5'>
        <div className='  flex justify-center m-auto '>
        <span className='rounded-full bg-green-750 py-1 text-base px-8 font-semibold text-white'>let&apos;s Write</span>
        </div>
        </Link>
        </div>}
    </div>
    </>
  )
}

export default page