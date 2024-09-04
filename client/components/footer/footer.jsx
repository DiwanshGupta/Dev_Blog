import React from "react";
import Link from "next/link";
import { FaEnvelope, FaGithub, FaLinkedin, FaLocationArrow, FaPhone, FaWhatsapp } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";


function Footer() {
  return (
   <div className="bg-blue-850 items-center p-4 text-white justify-center gap-4 font-bold flex flex-col md:flex-row">
    <div className="hover:text-green-750"> © 2024 Copyright Diwansh Gupta</div>
    <div className="flex flex-row hover:text-green-750 items-center">  
    <img src='/icon.svg' className='w-10' alt='Logo'/> 
    EchoThreads Team    </div>
    </div>
  );
}

export default Footer;