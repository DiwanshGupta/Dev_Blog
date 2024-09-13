"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import instance from '../../../utils/axios'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { SiPeakdesign } from 'react-icons/si'
const page = () => {
    const params=useParams()
    const { id } = params
    const [blogData,setBlogData]=useState()
    const user=useSelector((state)=>state.user?.user)
    const [comment,setcomments]=useState('')
    const [loading, setLoading] = useState(true); 

    const formattedDate = (data) => {
      
        if (!data) {
          return 'Invalid date';
        }
      
        const date = new Date(data);
      
        if (isNaN(date.getTime())) {
          return 'Invalid date';
        }
      
        const newDate=date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            timeZone: 'UTC' 
          });
            return newDate
      };
      
    const fetchdata=async()=>{
        try {
            const response=await instance(`/user/get/blog/${id}`)
            if(response.status===200){
                setBlogData(response.data)
                setLoading(false);

            }
        } catch (error) {
            console.log("error",error.message)
            setLoading(false);

        }      
    }
    const handleComment=async()=>{
        if(!comment){
            Swal.fire({
                title: 'Comment',
                text:  'Write Something on comment',
                icon: 'warning',
              })  
        }
        try {
            const response=await instance.post(`/user/comment/blog/${id}`,{comment},{
                headers: {
                    "Content-Type": "application/json"
                  },
            })
            if(response.status===201){
                    Swal.fire({
                        title: 'Comment',
                        text:  'Comment Uploaded Sucessfully',
                        icon:  'success',
                      })  
                      setBlogData(response.data)
            }
        } catch (error) {
            Swal.fire({
                title: 'Some error occured',
                text:   error.response?.data?.message || 'try again after Sometime',
                icon: 'warning',
              })  
        }
    }
    useEffect(()=>{
        fetchdata()
    },[])

    
    if (loading) {
        return (
            <div className='flex items-center justify-center h-screen py-8'>
                <div className="loader"></div>
            </div>
        );
    }

  return (
        <div className='  p-5  pt-10  md:pt-24'>
        <div className='font-extrabold max-w-md text-3xl items-center m-auto   text-blue-850 text-center'>
        {blogData?.title}
        <div className='text-xs justify-between py-4 px-8 flex flex-row text-black' >
        By {blogData?.author?.name}<span className='text-gray-400'> -  {formattedDate(blogData?.createdAt)}</span>
        </div>
        </div>
            <div className='md:w-2/3 justify-center m-auto rounded-md ' >
                <img src={blogData ? blogData?.blogImage : '/assets/blank-profile-picture-973460_640.webp'} className='w-full rounded-md object-cover h-fit md:h-96'/>
                <div className='py-4 font-medium border-b-2 text-start gap-5 w-10/12 justify-center m-auto'>
                <div dangerouslySetInnerHTML={{ __html: blogData?.content }} />
                </div>
                <div className='w-10/12  justify-center m-auto py-6'>
                    <h2 className='text-2xl font-semibold '>Comments</h2>
                    {user && (
                    <div className='flex gap-4 border-b-2 pb-4  flex-row'>
                    <div className=''>
                    <img src={user?.profile ? user.profile : '/assets/blank-profile-picture-973460_640.webp'}  className='w-16 h-12 object-cover rounded-md  '/>
                    </div>
                    <div className='w-full  gap-5'>
                        <textarea value={comment} onChange={(e)=>setcomments(e.target.value)} className='outline-none mb-3 p-3 rounded-md h-16 w-full border-2' placeholder='Write a comment...'/>
                        <button onClick={handleComment} className={`m-auto p-1 px-5 text-sm  rounded-full border-2 font-semibold border-gray-400 ${!comment?"pointer-events-none cursor-not-allowed text-gray-400 bg-gray-100":"cursor-pointer text-black"}`}>
                            Submit
                        </button>
                    </div>
                    </div>
                    )}
                    {blogData?.comments && blogData?.comments.length > 0 ?<>
                    {blogData?.comments.map((item,index)=>(
                    <div key={index} className='flex gap-4  p-3 border-b-2 pb-4 flex-row'>
                    <div className='rounded-md bg-gray-500 h-12 justify-center m-auto'>
                    <img src={item?.userId?.profile} className='w-16 select-none object-cover h-12 rounded-md'/>
                    </div>
                    <div className='w-full  '>
                        <div className=''>
                            <h2 className='font-semibold'>{item?.userId?.name}</h2>
                            <p className='py-2 text-xs'>
                                {item?.comment}
                            </p>
                            <span className='text-gray-400 text-sm'>{formattedDate(item.createdAt)}</span>
                        </div>
                       
                    </div>
                    </div>
                    ))}
                    </>: 
                     <div className=' justify-center h-60 flex flex-col items-center m-auto w-full '>
                     <span ><SiPeakdesign size={55} /></span>
                     <span className='font-semibold'>No comments on this post yet</span>
                     </div>
                     }
                </div>
                
            </div>
 
        </div>

  )
}

export default page