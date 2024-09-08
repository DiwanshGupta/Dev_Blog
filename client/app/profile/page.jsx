"use client"
import { useParams, useSearchParams } from 'next/navigation'
import React from 'react'


const page = () => {
    const params=useParams()
    console.log("params",params)
  return (
    <>
    <div className='w-full m-0 h-52'>
        <img src='/assets/Untitled-design.png' alt='vector-rectangle' className='w-full h-full'/>
    </div>
    <div className='md:p-12 p-3 w-4/5 justify-center m-auto relative'>
        <div className='left-[4%] right-[4%]   -top-16   rounded-lg absolute   text-center p-3 items-center bg-white'>
        <img src='/assets/samsung-memory-o4oYRBB1BEg-unsplash.jpg' className='w-16 my-1 object-cover  select-none h-16 justify-center m-auto rounded-full '/>
            <h2 className='text-xl font-bold py-3'>Diwansh Gupta</h2>
            <p className='text-sm font-medium w-full md:w-2/3 justify-center m-auto pb-3'>
            Derrick Henry Benbow is a theologian, essayist and creative who situates her work at the intersections of beauty, faith, feminism and culture.
            </p>
        </div>
        <div className='md:mt-24 mt-48 w-full  py-3'>
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