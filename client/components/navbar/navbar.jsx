"use client";
import Link from 'next/link'
import React, { useState } from 'react'
import { IoLogInOutline } from "react-icons/io5";
import {  HiOutlineMenuAlt3 } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

  return (
    <nav className='w-full z-50 p-4 shadow-sm shadow-slate-500 fixed  font-medium text-white bg-blue-850 '>
      <div className='container mx-auto flex justify-between items-center'>
        <Link href={'/'}>
        <div className='text-lg font-semibold italic hover:text-green-750 flex items-center'>
          <img src='/assets/icon.svg' className='w-10' alt='Logo'/> 
          EchoThreads
        </div>
        </Link>

        {/* Hamburger Icon for Mobile */}
        <div className='md:hidden flex items-center'>
          <button onClick={toggleMenu} className='focus:outline-none'>
            < HiOutlineMenuAlt3  size={30} />
          </button>
        </div>

        {/* Links - Hidden on Mobile */}
        <div className='hidden md:flex gap-8 items-center'>
          <Link href='/blog' className='hover:text-green-750 flex items-center'>Blogs</Link>
          <Link href='/write' className='hover:text-green-750 flex items-center'>Write</Link>
          <Link href='/about' className='hover:text-green-750 flex items-center'>About</Link>
          <Link href='/contact' className='hover:text-green-750 flex items-center'>Contact</Link>
        </div>

        <Link href='/signup' className='hidden md:block'>
        <div className='mr-5 hidden  items-center bg-white hover:text-green-750 text-blue-850 rounded-full px-8 font-bold md:flex py-1'>
          <IoLogInOutline size={25} />
          Signup
        </div>
        </Link>
      </div>
    
      {/* Slide-in Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full bg-blue-850 text-white w-64 transform transition-transform duration-700 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden flex flex-col gap-8 p-8`}
      >
         <div className='text-lg font-semibold flex-row w-full justify-between italic  flex items-center'>
          <span className='flex flex-row items-center'>
          <img src='/assets/icon.svg' className='w-10' alt='Logo'/> 
          EchoThreads
          </span>
          <span
            onClick={toggleMenu}
            className={`hover:text-green-750 cursor-pointer transition-transform duration-200 ${
            isOpen ? 'rotate-180' : 'rotate-0'
            }`}
        >
            <RxCross2 size={25} />
        </span>

        </div>
        <Link href='/blog' className='hover:text-green-750'>Blogs</Link>
        <Link href='/write' className='hover:text-green-750'>Write</Link>
        <Link href='/about' className='hover:text-green-750'>About</Link>
        <Link href='/contact' className='hover:text-green-750'>Contact</Link>
        <Link href='/signup'>
        <div className='mr-5 md:hidden  items-center bg-white hover:text-green-750 text-blue-850 rounded-full px-8 font-bold flex py-1'>
          <IoLogInOutline size={25} />
          Signup
        </div>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
