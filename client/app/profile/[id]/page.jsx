"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import Swal from 'sweetalert2'
import instance from '../../../utils/axios';

const VerifyEmail = () => {
  const {id}= useParams();  
  const router=useRouter()

 
  const verifyAccount = async () => {
    try {
      const response = await instance('/auth/verify-account', {
        params: { token:id }, 
      });
      if(response.status===201){
        router.push('/profile')
        Swal.fire({
            title: 'Verification',
            text: 'Account verfied succesfull',
            icon: 'success',
          })
        }
    console.log("response",response)
      } catch (error) {
        router.push('/login')
        Swal.fire({
          title: 'Some error occured',
          text:   error.response?.data?.message || 'try again after Sometime',
          icon: 'warning',
        })  
   }
  };
  

  useEffect(() => {
    
    const fakeUrl = "/verify-account/profile";

    window.history.replaceState(null, null, fakeUrl);

    const timeoutId = setTimeout(() => {
      verifyAccount();
    }, 500);

    // Cleanup timeout if component unmounts
    return () => clearTimeout(timeoutId);       
     }, []);
  return <div className='flex  items-center w-fit  h-screen py-8  justify-center m-auto'><div className="loader items-center justify-center"></div></div>;
};

export default VerifyEmail;
