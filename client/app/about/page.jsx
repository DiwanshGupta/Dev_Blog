import React from "react";
import Link from 'next/link'
const page = () => {
  return (
    <>
      <div className=" mx-auto bgimageLogin bg-black bg-opacity-15  items-center justify-center flex flex-col  border-orange-300">
        <div className="max-w-screen-2xl m-5  md:mx-32  text-white flex items-center flex-col md:flex-row justify-between mt-8">
          <div className="md:w-2/4">
            <div className=" mt-16">
              <h2 className=" text-md">This is the best blog platform</h2>
              <br />
              <h1 className=" text-5xl">
                Welcome to Echo Threads
              </h1>
            </div>
            <div className=" my-4 text-lg text-white font-semibold">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque
              ipsam aliquam sit pariatur consequatur, porro autem beatae libero,
              amet excepturi nisi quo rem, modi officia cupiditate quia!
              Molestias, vitae corrupti.
            </div>
            <button
              type="button"
              className=" mt-6 mx-4 px-2 py-1 border border-green-600 bg-green-750 rounded-lg"
            >
              <Link href="/login"> Connect Now</Link>
            </button>
            <button
              type="button"
              className=" mt-6 px-2 py-1 border border-green-600  rounded-lg"
            >
              <Link href="/about"> Learn more</Link>
            </button>
          </div>
          <div className="">
            <img
              src="/assets/icon.svg"
              alt="img"
              className="  md:ml-16 mt-10   mr-10"
            />
          </div>
        </div>
        <div className="w-full bg-black bg-opacity-75">
          <div className="max-w-screen-2xl m-5  lg:mx-32">
  
            <div className=" m-5    text-white flex items-center flex-col md:flex-row justify-between mt-8">
              <div className="" >
                <img
                  src="/assets/istockphoto-1097092670-612x612-removebg-preview.png"
                  alt="img"
                  className="hidden md:block  md:ml-16 mt-10   mr-10"
                />
              </div>
              <div className="md:w-2/4" >
                <div className=" mt-16">
                  <h2 className=" text-md">We are here to help you</h2>
                  <br />
                  <h1 className=" text-5xl">
                    Get Start now <br />
                  </h1>
                </div>
                <div className=" my-4 text-lg">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Neque ipsam aliquam sit pariatur consequatur, porro autem
                  beatae libero, amet excepturi nisi quo rem, modi officia
                  cupiditate quia! Molestias, vitae corrupti.
                </div>
                <button
                  type="button"
                  className=" mt-6 mx-4 px-2 py-1 border border-green-600 bg-green-750 rounded-lg"
                >
                  <Link href="/blogs"> Visit more</Link>
                </button>
                <button
                  type="button"
                  className=" mt-6 px-2 py-1 border border-green-600  rounded-lg"
                >
                  <Link href="/about"> Learn more</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default page;