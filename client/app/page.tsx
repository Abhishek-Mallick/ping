"use client";

import React, { useCallback, useEffect, useState } from "react";
import { TbMessages } from "react-icons/tb";
import { AiOutlineHome } from "react-icons/ai";
import { FiHash } from "react-icons/fi";
import { FaRegBell } from "react-icons/fa6";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { IoBookmarkOutline } from "react-icons/io5";
import FeedCard from "@/components/FeedCard";
import GoogleLoginButton from "@/components/Auth/GoogleLoginButton";
import { CredentialResponse } from "@react-oauth/google";
import toast from "react-hot-toast";
import { GraphQLClient } from "graphql-request";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import Image from "next/image";
import { BsImages } from "react-icons/bs";

interface PingSidebarButton {
  title: string;
  icon: React.ReactNode;
}

const sidebarMenuItems : PingSidebarButton[] = [
  {
    title: "Home",
    icon: <AiOutlineHome />
  },
  {
    title: "Explore",
    icon: <FiHash />
  },
  {
    title: "Notifications",
    icon: <FaRegBell />
  },
  {
    title: "Messages",
    icon: <HiOutlineEnvelope />
  },
  {
    title: "Bookmarks",
    icon: <IoBookmarkOutline />
  },
  {
    title: "Messages",
    icon: <HiOutlineEnvelope />
  },
  {
    title: "Profile",
    icon: <HiOutlineEnvelope />
  }
]

export default function Home() {

  const { user } = useCurrentUser();

  const handleSelectImage = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();
  }, [])
  // const [isUserSignedIn, setIsUserSignedIn] = useState<boolean>(false);

  // useEffect(() => {
  //   // Check if the user is signed in by looking for the __ping_token in local storage
  //   const token = localStorage.getItem('__ping_token');
  //   setIsUserSignedIn(!!token);
  // }, []);

  const handleLoginWithGoogle = useCallback(async (cred: CredentialResponse) => {
    const googleToken = cred.credential;

    if (!googleToken) return toast.error("Google login failed");

    // Verify the google token
    console.log("Google token:", googleToken);
    console.log("GraphQL client:", graphqlClient);
    try {
      const { verifyGoogleToken } = await graphqlClient.request(verifyUserGoogleTokenQuery, { token: googleToken });
      console.log("Verification result:", verifyGoogleToken);
    } catch (error) {
      console.error("GraphQL verification error:", error);
      toast.error("An error occurred during token verification.");
    }
  }, []);

  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-56">
        <div className="col-span-3 justify-start pt-2 px-4 ml-16 relative">
          <div className="text-4xl h-fit w-fit hover:bg-gray-600 rounded-full p-4 cursor-pointer transition-all duration-200">
            <TbMessages />
          </div>
          <div className="mt-4 text-2xl pl-16 pr-4">
            <ul>
              {sidebarMenuItems.map(item => <li className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full cursor-pointer px-4 py-2 w-fit mt-2" key={item.title}>
                <span className="text-2xl">{item.icon}</span>
                <span>{item.title}</span>
                </li>)}
            </ul>
            <button className="bg-blue-400 text-white font-semibold text-lg py-3 px-3 rounded-full hover:bg-blue-500 transition duration-200 ease-in-out w-full mt-4">Ping</button>
          </div>
        {user && (<div className="absolute bottom-5 flex gap-2 bg-slate-800 px-3 py-2 rounded-full">
          {user && (user.profileImageURL && <Image className="rounded-full" src={user?.profileImageURL} alt="user-image" height={50} width={50} />)}
        <div>
          <h3 className="text-xl">{user.firstName} {user.lastName}</h3>
        </div>
        </div>)}
        </div>
        <div 
          className="col-span-5 border-r-[1px] border-l-[1px] border-gray-600 h-screen overflow-scroll"
          style={{
            msOverflowStyle: 'none',
            scrollbarWidth: 'none'
          }}
        >
          <div>
            <div className='border border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer border-r-0 border-l-0 border-b-0'>
              <div className='grid grid-cols-12 gap-3'>
                <div className='col-span-1'>
                  {user?.profileImageURL ? <Image src={user?.profileImageURL} className="rounded-full" alt="user-image" height={50} width={50} /> : null}
                </div>
                <div className="col-span-11">
                  <textarea className="w-full bg-transparent border-none focus:outline-none text-xl px-3 border-b border-slate-700" placeholder="What's on your mind?" rows={3}></textarea>
                  <div className="mt-2 flex justify-between items-center">
                    <BsImages onClick={handleSelectImage} className="text-xl" />
                    <button className="bg-blue-400 text-white font-semibold text-sm py-2 px-4 rounded-full hover:bg-blue-500 transition duration-200 ease-in-out mt-4">Ping</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-3 p-5">
          { !user && ( 
            <div className="p-5 bg-slate-700 rounded-lg">
              <h1 className="my-2 text-2xl">New to Ping?</h1>
              <GoogleLoginButton />          
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
