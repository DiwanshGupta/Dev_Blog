"use client"
import instance from "../../utils/axios"
import Link from 'next/link'
import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import Swal from 'sweetalert2'
import { getuser } from "../../redux/feature/user/slice";

const page = () => {
    const dispatch=useDispatch()
    const [show, setShow] = useState(false);
    const [loader,setloader]=useState(false)
    const [form, setForm] = useState({
        name:"",
        email: "",
        password: "",
    });

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setloader(true) 
        try {
            const response=await instance.post('/auth/signup',
                form,
                {
                    headers: {
                      "Content-Type": "application/json"
                    },
                  } 
            )
            if(response.status===201){
                dispatch(getuser(response.data.user)); 
                setloader(false)
                setForm({ 
                    name:"",
                    email: "",
                    password: "",})
                Swal.fire({
                    title: 'Verify Account',
                    text: 'Please check you email . Verify you account',
                    icon: 'success',
                  })
                }
            console.log("response",response)
        } catch (error) {
            setloader(false)
            console.log("error",error)
            Swal.fire({
                title: 'Some error occured',
                text:   error.response?.data?.message || 'try again after Sometime',
                icon: 'warning',
              })  
        }}
  return (
    <div className="flex items-center bgimageLogin justify-center min-h-screen   ">
    <div className="md:max-w-md max-w-sm bgLogin items-center w-full p-8 space-y-8 my-24  rounded-lg shadow-xl">
        <div className="flex flex-col justify-center items-center">
            <img
                className="w-auto h-36  items-center m-0 rounded-full "
                src="/assets/icon.svg"
                alt="Logo"
            />
            <h2 className="text-lg md:text-3xl text-white font-bold text-center ">
            EchoThreads
            </h2>
            <h2 className="text-lg md:text-3xl text-white font-bold text-center ">
            Create Your Account
            </h2>
        </div>
        <form className="space-y-6"  onSubmit={handleSubmit}>
            <div className="space-y-4">
                <div>
                    <input
                        id="name"
                        name="name"
                        type="name"
                        autoComplete="name"
                        required
                        value={form.name}
                        onChange={handleInputChange}
                        className={` block w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md shadow-sm outline-none placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  `}
                        placeholder=" Enter your Name"
                    />
                </div>
                <div>
                    <input
                        id="email"
                        name="email"
                        type="email"    
                        autoComplete="email"
                        value={form.email}
                        onChange={handleInputChange}
                        required
                        className={` block w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md shadow-sm outline-none placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  `}
                        placeholder="Enter Email"
                    />
                </div>
                <div className="relative">
                    <input
                        id="password"
                        name="password"
                        type={show ? "text" : "password"}
                        autoComplete="current-password"
                        required
                        minLength={6}
                        value={form.password}
                        onChange={handleInputChange}
                        className={` block w-full  px-3 py-2 text-gray-900 border border-gray-300 rounded-md shadow-sm outline-none placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  `}
                        placeholder="Enter your password"
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
                 
            </div>
            <div>
                 <button
                    type="submit"
                    className=" flex justify-center w-full px-3 py-2 text-sm font-semibold text-green-750 transition duration-150 ease-in-out bg-white border border-transparent rounded-md group hover:bg-green-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2  "
                    >
                    {loader? 
                    <div role="status">
                        <svg aria-hidden="true" className="w-6 h-6  fill-blue-600 animate-spin font-extrabold rounded-full  text-green-750 hover:text-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                    :
                   <span>Sign Up</span> 
                }
                </button>
               
                <p className="mt-2 text-sm text-center text-gray-600">
                    Or{" "}
                    <span className="font-medium text-indigo-700 hover:text-indigo-500">
                        Already Have an Account?{" "}
                        <Link href="/login">Sign In now</Link>
                    </span>
                </p>
            </div>
        </form>
    </div>
</div>
  )
}

export default page