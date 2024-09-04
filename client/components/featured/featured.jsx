import React from 'react'

const Featured = () => {
  return (
    <div className='md:p-12 p-3'>
        <div className=''>
        <div className='text-3xl font-extrabold '> Top Stories</div>
        <div className='grid grid-rows-1 grid-cols-1 md:grid-cols-2 gap-8  py-8'>
        <div className='items-center w-[80%]    mt-2  justify-center m-auto' >
        <img src='/stories.svg' className='w-[90%] lg:w-full'/>
        <div className='font-semibold w-4/5 text-base md:text-lg lg:text-2xl p-3'>Melvin Gordon is making the right decision walking away from the Chargers
        </div>
        <div className='flex flex-row font-semibold items-center gap-2'>
        <img src='/stories.svg' className='rounded-full w-16 h-16  '/>
        By Diwansh Gupta<span className='text-gray-400'> - Mar-1,2024</span>
        </div>
        </div>
        <div className='flex flex-col mt-0  items-center justify-center  m-auto gap-1 w-[85%]'>      
        <div className='flex p-3 hover:shadow-md cursor-pointer rounded-md hover:bg-slate-100 hover:text-green-750    flex-col lg:flex-row  gap-5  '>
            <div className='   w-56  h-full  rounded-md '>
            <img src='/stories.svg' className=' w-full  rounded-md '/>
            </div>
            <div className='flex font-semibold flex-col  justify-between'>
                <div className='text-gray-400'>
                    NHL
                </div>
                <div className='text-base md:text-xs lg:text-lg w-[93%]'>
                Stanley Cup Playoffs format, qualification system
                Stanley Cup
                </div>
                <div className='text-base text-black' >
                By Diwansh Gupta<span className='text-gray-400'> - Mar-1,2024</span>
                </div>
            </div>
            </div>
            <div className='flex p-3 hover:shadow-md cursor-pointer rounded-md hover:bg-slate-100 hover:text-green-750    flex-col lg:flex-row gap-5  '>
            <div className='   w-56  h-full  rounded-md '>
            <img src='/stories.svg' className=' w-full  rounded-md '/>
            </div>
            <div className='flex font-semibold flex-col  justify-between'>
                <div className='text-gray-400'>
                    NHL
                </div>
                <div className='text-base md:text-sm lg:text-lg w-[93%]'>
                Stanley Cup Playoffs format, qualification system
                Stanley Cup
                </div>
                <div className='text-base text-black' >
                By Diwansh Gupta<span className='text-gray-400'> - Mar-1,2024</span>
                </div>
            </div>
            </div>
            <div className='flex p-3 hover:shadow-md cursor-pointer rounded-md hover:bg-slate-100 hover:text-green-750    flex-col lg:flex-row gap-5  '>
            <div className='   w-56  h-full  rounded-md '>
            <img src='/stories.svg' className=' w-full  rounded-md '/>
            </div>
            <div className='flex font-semibold flex-col  justify-between'>
                <div className='text-gray-400'>
                    NHL
                </div>
                <div className='text-base md:text-sm lg:text-lg w-[93%]'>
                Stanley Cup Playoffs format, qualification system
                Stanley Cup
                </div>
                <div className='text-base text-black' >
                By Diwansh Gupta<span className='text-gray-400'> - Mar-1,2024</span>
                </div>
            </div>
            </div>
            <div className='flex p-3 hover:shadow-md cursor-pointer rounded-md hover:bg-slate-100 hover:text-green-750    flex-col lg:flex-row gap-5  '>
            <div className='   w-56  h-full  rounded-md '>
            <img src='/stories.svg' className=' w-full  rounded-md '/>
            </div>
            <div className='flex font-semibold flex-col  justify-between'>
                <div className='text-gray-400'>
                    NHL
                </div>
                <div className='text-base md:text-sm lg:text-lg w-[93%]'>
                Stanley Cup Playoffs format, qualification system
                Stanley Cup
                </div>
                <div className='text-base text-black' >
                By Diwansh Gupta<span className='text-gray-400'> - Mar-1,2024</span>
                </div>
            </div>
            </div>
        </div>
        </div>
        <div className='  flex justify-center m-auto '>
        <span className='rounded-full bg-green-750 p-3 text-xl px-8 font-semibold text-white'>Discover more</span>
        </div>
        </div>
    </div>
  )
}

export default Featured