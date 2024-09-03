import React from 'react'
import { FaChevronRight } from "react-icons/fa";
const Hero = () => {
  return (
    <div className='heroBg flex  text-center flex-col  gap-5 font-extrabold items-center m-auto text-3xl md:text-5xl text-white  justify-start pt-[8rem] h-[90vh]  md:h-[75vh]'> 
    Share or discover <br/>the best sports content
    <div className='p-3 text-xl px-8 rounded-full bg-green-750'>
      Discover more
    </div>
    <span className='text-base flex flex-row items-center font-medium'>
      Visit Blog <FaChevronRight />
    </span>
    </div>
  )
}

export default Hero