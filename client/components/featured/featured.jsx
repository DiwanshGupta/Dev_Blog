import Link from 'next/link'
import React from 'react'

const Featured = () => {
  return (
    <div className='md:p-12 p-3'>
        <div className=''>
        <div className='text-3xl font-extrabold '> Top Stories</div>
        <div className='grid grid-rows-1 grid-cols-1 md:grid-cols-2 gap-8  py-8'>
        <div className='items-center w-[80%]    mt-2  justify-center m-auto' >
        <img src='/assets/visax-5jgvVlkI0mw-unsplash.jpg' className='w-full rounded-lg'/>
        <div className='font-semibold w-4/5 text-base md:text-lg lg:text-2xl p-3'>Melvin Gordon is making the right decision walking away from the Chargers
        </div>
        <div className='flex flex-row font-semibold items-center text-sm gap-2'>
        <img src='/assets/visax-5jgvVlkI0mw-unsplash.jpg' className='rounded-full w-12 h-12  '/>
        By Diwansh Gupta<span className='text-gray-400'> - Mar-1,2024</span>
        </div>
        </div>
        <div className='flex flex-col mt-0  items-center justify-center  m-auto gap-1 w-[85%]'>      
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
        <Link href={'/blog'}>
        <div className='  flex justify-center m-auto '>
        <span className='rounded-full bg-green-750 p-3 text-xl px-8 font-semibold text-white'>Explore more</span>
        </div>
        </Link>
        </div>
    </div>
  )
}

export default Featured