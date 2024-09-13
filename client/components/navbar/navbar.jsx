"use client";
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { IoLogInOutline } from "react-icons/io5";
import {  HiOutlineMenuAlt3 } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { currentuser, userLogout} from "../../redux/feature/user/api"
import { CgProfile } from "react-icons/cg";
import { FaPowerOff } from "react-icons/fa6";

const Navbar = () => { 
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
 const [isOpen, setIsOpen] = useState(false);
 const [isDropdownOpen, setIsDropdownOpen] = useState(false);
 const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
 const closeDropdown = () => setIsDropdownOpen(false);

  const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    const handleLogout=()=>{
      dispatch(userLogout())
    }

    useEffect(() => {
      dispatch(currentuser()); 
    }, [dispatch]);
  
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
          <Link href='' className='hover:text-green-750 flex items-center'>About</Link>
          <Link href='' className='hover:text-green-750 flex items-center'>Contact</Link>
        </div>
        
        <div className='hidden   md:block md:relative'
          onMouseEnter={() => setIsDropdownOpen(true)}
          // onMouseLeave={closeDropdown}
          >
        {user?<>
         <Link href='/profile'  
         onClick={closeDropdown}
           >
         <div className='hidden items-center mr-16 hover:text-green-750 text-white rounded-full font-bold md:flex '>
         {user?.profile ? (
                <img
                  src={user.profile} 
                  alt="User profile"
                  className="w-10  object-cover select-none h-10 justify-center m-auto rounded-full"
                />
              ) : (
                <CgProfile size={35} />
              )}
         </div>
         </Link>
         {isDropdownOpen && ( <div
           className="absolute w-36 flex flex-col right-6 items-center gap-2  top-full  mt-0 bg-white border rounded shadow-xl p-3 z-50 text-white "
           onMouseEnter={() => setIsDropdownOpen(true)}
           onMouseLeave={closeDropdown}
            >
            <Link href={'/profile'} className=''>
            <div className='flex flex-row px-2 py-2 bg-green-600/45 p-1 text-sm text-nowrap rounded-md  hover:bg-green-750' 
            >
             View Profile
             </div>
             </Link>
             <div className='flex px-3 py-2 flex-row bg-green-600/45  items-center text-center p-1 text-sm text-nowrap cursor-pointer rounded-md hover:bg-green-750 gap-2' 
            onClick={handleLogout}>
            <FaPowerOff size={20} />
             Logout
             </div>
          </div>)}
         </>
         : <Link href='/signup' className='hidden md:block'>
        <div className='mr-5 hidden  items-center bg-white hover:text-green-750 text-blue-850 rounded-full px-8 font-bold md:flex py-1'>
          <IoLogInOutline size={25} />
          Signup
        </div>
        </Link>}
        </div>
      </div>
    
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
        <Link href='/blog' className='hover:text-green-750 justify-center  w-full items-center text-center' onClick={toggleMenu}>Blogs</Link>
        <Link href='/write' className='hover:text-green-750 justify-center  w-full items-center text-center' onClick={toggleMenu} >Write</Link>
        <Link href='' className='hover:text-green-750 justify-center  w-full items-center text-center' onClick={toggleMenu} >About</Link>
        <Link href='' className='hover:text-green-750 justify-center  w-full items-center text-center' onClick={toggleMenu} >Contact</Link>
        {user?
        <>
         <Link href='/profile'  onClick={toggleMenu}>
         <div className='mr-5 md:hidden gap-2 items-center bg-white hover:text-green-750 text-blue-850 rounded-full px-8 font-bold flex py-1'>
         <CgProfile size={25} />
           Profile
         </div>
         </Link>
         <div className='mr-5 md:hidden gap-2 items-center bg-white hover:text-green-750 text-blue-850 rounded-full px-8 font-bold flex py-1'  onClick={handleLogout}>
          <FaPowerOff size={20} />
           Logout
         </div>
         </>
        :
        <Link href='/signup'>
        <div className='mr-5 md:hidden  items-center bg-white hover:text-green-750 text-blue-850 rounded-full px-8 font-bold flex py-1'>
          <IoLogInOutline size={25} />
          Signup
        </div>
        </Link>}
       
      </div>
    </nav>
  )
}

export default Navbar
