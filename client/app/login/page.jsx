"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Swal from 'sweetalert2';
import instance from '../../utils/axios';

const page = () => {
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(form)
        try {
            const response=await instance.post('/auth/login',
                form,
                {
                    headers: {
                      "Content-Type": "application/json"
                    },
                  }
            );
            if(response.status===201){
                // setloader(false)
                // setForm({ 
                //     name:"",
                //     email: "",
                //     password: "",})
                Swal.fire({
                    title: 'Verify Account',
                    text: 'user login successfully',
                    icon: 'success',
                  })
                }
        } catch (error) {
            Swal.fire({
                title: 'Some error occured',
                text:   error.response?.data?.message || 'try again after Sometime',
                icon: 'warning',
              })  
        }
    }
  return (
    <div className="flex items-center bgimageLogin justify-center min-h-screen  ">
    <div className="md:max-w-md max-w-sm bgLogin items-center w-full p-8 space-y-8   rounded-lg shadow-xl">
        <div className="flex flex-col justify-center items-center">
            <img
                className="w-auto h-36  items-center m-0 rounded-full "
                src="/assets/icon.svg"
                alt="Logo"
            />
            <h2 className="text-lg md:text-3xl text-white font-bold text-center ">
            EchoThreads
            </h2>
        </div>
        <form className="space-y-6"  onSubmit={handleSubmit} >
            <div className="space-y-4">
                <div>
                    <input
                        id="email"
                        name="email"
                        value={form.name}
                        onChange={handleInputChange}
                        type="email"
                        autoComplete="email"
                        required
                        className={` block w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md shadow-sm outline-none placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  `}
                        placeholder="Enter your Email"
                    />
                </div>
                <div className="relative">
                    <input
                        id="password"
                        name="password"
                        value={form.name}
                        onChange={handleInputChange}
                        type={show ? "text" : "password"}
                        autoComplete="current-password"
                        required
                        className={` block w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md shadow-sm outline-none placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  `}
                        placeholder="Enter your Password"
                    />
                    {!show ? (
                        <AiOutlineEyeInvisible
                            className="absolute cursor-pointer bottom-3 right-2"
                            size={20}
                            onClick={() => setShow(true)}
                        />
                    ) : (
                        <AiOutlineEye
                            className="absolute cursor-pointer bottom-3 right-2"
                            size={20}
                            onClick={() => setShow(false)}
                        />
                    )}
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="w-4 h-4 text-indigo-600 outline-none border-gray-300 rounded  "
                        required
                    />
                    <label
                        htmlFor="remember-me"
                        className="block ml-2 text-sm font-medium text-white"
                    >
                        I Agree Terms & Conditions
                    </label>
                </div>
                <div className="text-sm">
                <span className="font-medium text-indigo-700 hover:text-indigo-500">
                Forgot your password?
                </span>
                </div>
            </div>
            <div>
                <button
                    type="submit"
                    className=" flex justify-center w-full px-3 py-2 text-sm font-semibold text-green-750 transition duration-150 ease-in-out bg-white border border-transparent rounded-md group hover:bg-green-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2  "
                >
                    Sign In
                </button>
                <p className="mt-2 text-sm text-center text-gray-600">
                    Or{" "}
                    <span className="font-medium text-indigo-700 hover:text-indigo-500">
                        Don&apos;t Have an Account?{" "}
                        <Link href="/signup">Sign up now</Link>
                    </span>
                </p>
            </div>
        </form>
    </div>
</div>
  )
}

export default page