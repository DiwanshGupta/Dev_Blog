"use client"
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import instance from '../../utils/axios'
import Swal from 'sweetalert2'
import { getuser } from '../../redux/feature/user/slice'
import { useDispatch } from "react-redux";

const UpdateProfile = () =>
{
    const dispatch=useDispatch()
    const [isModalVisible,setIsModalVisible]=useState( false );
    const [loader,setloader]=useState(false)

    const [form, setForm] = useState({
        name: "",
        bio: "",
    });
    const [selectedImage, setSelectedImage] = useState(null) 
    const [uploading, setUploading] = useState(false); 

    const handleImageChange = (e) => {
       const file = e.target.files[0];
       if (file) {
           setSelectedImage(file);  
       }
   };

   const handleImageUpload = async () => {
       if (!selectedImage) {
           alert("Please select an image first.");
           return;
       }

       const formData = new FormData();
       formData.append("profileImage", selectedImage);  

       try {
           setUploading(true);
           const response = await instance.post('/user/upload/profile', formData, {
               headers: {
                   'Content-Type': 'multipart/form-data',
               },
           });
           if(response.status===200){

               setUploading(false);
               Swal.fire({
                   title: 'update',
                   text: 'Image upload successfully',
                   icon: 'success',
                 })
                 dispatch(getuser(response.data.user)); 

           }
       } catch (error) {
           console.error("Error uploading image:", error);
           setUploading(false);
           Swal.fire({
               title: 'Some error occured',
               text:   error.response?.data?.message || 'try again after Sometime',
               icon: 'warning',
             })  
       }
   };
    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
  const toggleModal = () =>
  {
    setIsModalVisible( !isModalVisible );
  };

  const handlesubmit=async(e)=>{
    e.preventDefault()
    setloader(false)
    console.log("form",form)    
  }

  return (
    <div >
      <div className="flex justify-start items-center cursor-pointer ">
        <button onClick={ toggleModal } variant="solid"  className="text-white  bg-green-750 font-medium p-2 capitalize text-sm rounded-lg" >
          Update profile
        </button>
      </div>
      { isModalVisible && (
        <div
          className="fixed inset-0 z-50 p-3 overflow-y-auto bg-black  bg-opacity-50 flex items-center justify-center"
        >
          <div className="relative p-1 w-full max-w-md">
            <div className=" bgLogin rounded-lg shadow-xl">
              <button
                type="button"
                onClick={ toggleModal }
                className="absolute mt-5  right-6 md:right-11  bg-transparent  text-white rounded-lg text-sm p-1 inline-flex items-center"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </button>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Edit Profile</h3>
                <form onSubmit={handlesubmit}  className="space-y-4">
                  <div className="flex flex-col items-center mb-4">
                    <div
                      className="bg-gray-200 border-2 outline-none h-28 w-28 rounded-full flex items-center justify-center cursor-pointer overflow-hidden transition-all duration-300   relative group mb-2"
                       
                    >
                      
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <input type="file" accept="image/*" onChange={handleImageChange} className="my-3" />
                        <button onClick={handleImageUpload} className={`btn ${uploading ? 'btn-disabled' : ''}`}  disabled={uploading} >
                            {uploading ? 'Uploading...' : 'Upload Image'}
                        </button>
                    </div>
                    <label htmlFor="image" className="text-sm font-medium text-gray-300 cursor-pointer">
                      Change Profile Picture
                    </label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      className="hidden"
                      accept="image/*"
                    />
                  </div>

                  <div>
                    <label htmlFor="nickname" className="block text-sm font-medium text-gray-300 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      onChange={handleInputChange}
                      value={form.name}
                      name="name"
                      className="w-full px-3 py-2 bg-white border outline-none rounded-md text-gray-600 placeholder-gray-400  "  
                      placeholder="Your Name"
                    />
                  </div>

                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-1">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      onChange={handleInputChange}
                      value={form.bio}
                      rows={ 4 }
                      className="w-full px-3 py-2  bg-white border outline-none rounded-md text-gray-600 placeholder-gray-400  "  
                      placeholder="Tell us about yourself"
                    />
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
                   <span>Update</span> 
                }
                </button>
                
            </div>
                  
                </form>
              </div>
            </div>
          </div>
        </div>
      ) }
    </div>
  );
};

export default UpdateProfile;
