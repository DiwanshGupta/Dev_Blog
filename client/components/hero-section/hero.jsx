import Link from 'next/link';
import React from 'react'
import { FaChevronRight } from "react-icons/fa";
const Hero = () => {
  return (
    <div className='heroBg flex  text-center flex-col  gap-5 font-extrabold items-center m-auto text-3xl md:text-5xl text-white  justify-start pt-[8rem] h-[95vh]  '> 
    Share or discover <br/>the best  content
    <Link href={'/blog'}>
    <div className='p-3 text-xl px-8 rounded-full bg-green-750'>
      Discover more
    </div>
    </Link>
    <Link href={'/blog'}>
    <span className='text-base gap-3 flex flex-row items-center font-medium'>
      Visit Blog <FaChevronRight />
    </span>
    </Link>
    </div>
  )
}

export default Hero