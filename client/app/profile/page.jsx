"use client"
import React, { useEffect, useState } from 'react'
import {  useSelector } from 'react-redux'
import UpdateProfile from "../../components/UpdateProfile/updateProfile"
import { useRouter } from 'next/navigation'

const page = () => {
    const user=useSelector((state)=>state.user?.user)
    const [loading, setLoading] = useState(true); // Add loading state
    const router = useRouter();
  
    useEffect(() => {
      // Simulate the delay in fetching user data
      if (!user) {
        setLoading(true); // Show loading while fetching user
      } else {
        setLoading(false); // Set loading to false once user data is available
      }
    }, [user]);
  
    useEffect(() => {
      // If user is not available after loading, redirect to login
      if (!loading && !user) {
        router.push('/login');
      }
    }, [loading, user, router]);
  
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
        <div className='grid grid-rows-1 grid-cols-1 sm:grid-cols-2 gap-8  py-8'>
        <div className='flex p-3 justify-center m-auto  hover:shadow-md cursor-pointer rounded-md hover:bg-slate-100 hover:text-green-750    flex-col lg:flex-row  gap-5  '>
            <div className='  w-full h-fit sm:w-56 justify-center m-auto  sm:h-full  rounded-md '>
            <img src='/assets/visax-5jgvVlkI0mw-unsplash.jpg' className=' w-full  rounded-md '/>
            </div>
            <div className='flex gap-3 font-semibold flex-col  justify-between'>
                <div className='text-gray-400'>
                    NHL
                </div>
                <div className='text-sm sm:text-base md:text-xs lg:text-lg w-full'>
                Stanley Cup from Playoffs format, qualification system 
                Stanley Cup
                </div>
                <div className='text-xs sm:text-base justify-between flex flex-row text-black' >
                By Diwansh Gupta<span className='text-gray-400'> - Mar-1,2024</span>
                </div>
            </div>
        </div>
        <div className='flex p-3 justify-center m-auto  hover:shadow-md cursor-pointer rounded-md hover:bg-slate-100 hover:text-green-750    flex-col lg:flex-row  gap-5  '>
            <div className='  w-full h-fit sm:w-56 justify-center m-auto  sm:h-full  rounded-md '>
            <img src='/assets/visax-5jgvVlkI0mw-unsplash.jpg' className=' w-full  rounded-md '/>
            </div>
            <div className='flex gap-3 font-semibold flex-col  justify-between'>
                <div className='text-gray-400'>
                    NHL
                </div>
                <div className='text-sm sm:text-base md:text-xs lg:text-lg w-full'>
                Stanley Cup from Playoffs format, qualification system 
                Stanley Cup
                </div>
                <div className='text-xs sm:text-base justify-between flex flex-row text-black' >
                By Diwansh Gupta<span className='text-gray-400'> - Mar-1,2024</span>
                </div>
            </div>
        </div>
        <div className='flex p-3 justify-center m-auto  hover:shadow-md cursor-pointer rounded-md hover:bg-slate-100 hover:text-green-750    flex-col lg:flex-row  gap-5  '>
            <div className='  w-full h-fit sm:w-56 justify-center m-auto  sm:h-full  rounded-md '>
            <img src='/assets/visax-5jgvVlkI0mw-unsplash.jpg' className=' w-full  rounded-md '/>
            </div>
            <div className='flex gap-3 font-semibold flex-col  justify-between'>
                <div className='text-gray-400'>
                    NHL
                </div>
                <div className='text-sm sm:text-base md:text-xs lg:text-lg w-full'>
                Stanley Cup from Playoffs format, qualification system 
                Stanley Cup
                </div>
                <div className='text-xs sm:text-base justify-between flex flex-row text-black' >
                By Diwansh Gupta<span className='text-gray-400'> - Mar-1,2024</span>
                </div>
            </div>
        </div>
        <div className='flex p-3 justify-center m-auto  hover:shadow-md cursor-pointer rounded-md hover:bg-slate-100 hover:text-green-750    flex-col lg:flex-row  gap-5  '>
            <div className='  w-full h-fit sm:w-56 justify-center m-auto  sm:h-full  rounded-md '>
            <img src='/assets/visax-5jgvVlkI0mw-unsplash.jpg' className=' w-full  rounded-md '/>
            </div>
            <div className='flex gap-3 font-semibold flex-col  justify-between'>
                <div className='text-gray-400'>
                    NHL
                </div>
                <div className='text-sm sm:text-base md:text-xs lg:text-lg w-full'>
                Stanley Cup from Playoffs format, qualification system 
                Stanley Cup
                </div>
                <div className='text-xs sm:text-base justify-between flex flex-row text-black' >
                By Diwansh Gupta<span className='text-gray-400'> - Mar-1,2024</span>
                </div>
            </div>
        </div>
        </div>
    </div>
    </>
  )
}

export default page