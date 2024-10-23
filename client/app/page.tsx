import React, { useCallback } from "react";
import { TbMessages } from "react-icons/tb";
import { AiOutlineHome } from "react-icons/ai";
import { FiHash } from "react-icons/fi";
import { FaRegBell } from "react-icons/fa6";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { IoBookmarkOutline } from "react-icons/io5";
import FeedCard from "@/components/FeedCard";
import GoogleLoginButton from "@/components/Auth/GoogleLoginButton";

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


  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-56">
        <div className="col-span-3 justify-start pt-2 px-4 ml-16">
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
            <button className="bg-blue-400 text-white font-semibold text-lg py-3 px-3 rounded-full hover:bg-blue-500 transition duration-200 ease-in-out w-full mt-4">Tweet</button>
          </div>
        </div>
        <div 
          className="col-span-5 border-r-[1px] border-l-[1px] border-gray-600 h-screen overflow-scroll"
          style={{
            msOverflowStyle: 'none',
            scrollbarWidth: 'none'
          }}
        >
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
          <div className="p-5 bg-slate-700 rounded-lg">
            <h1 className="my-2 text-2xl">New to Ping?</h1>
            <GoogleLoginButton />          
          </div>
        </div>
      </div>
    </div>
  );
}
