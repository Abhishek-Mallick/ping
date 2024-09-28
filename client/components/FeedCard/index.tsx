import Image from 'next/image'
import React from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { BiMessageRounded, BiUpload } from 'react-icons/bi'
import { FaRetweet } from 'react-icons/fa6'

const FeedCard = () => {
  return (
    <div className='border border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer border-r-0 border-l-0 border-b-0'>
        <div className='grid grid-cols-12 gap-3'>
            <div className='col-span-1'>
                <Image src="https://avatars.githubusercontent.com/u/106394426?v=4" alt="user-image" height={50} width={50} />
            </div>
            <div className='col-span-11'>
                <h5>Abhishek Mallick</h5>
                <p>This is a test post. Make sure to check it out. Edit this post to see the changes.✨ #test #post #edit</p>

                <div className='flex justify-between mt-5 text-xl items-center p-2 w-[90%]'>
                  <div>
                      <BiMessageRounded />
                  </div>
                  <div>
                      <FaRetweet />
                  </div>
                  <div>
                    <AiOutlineHeart />
                  </div>
                  <div>
                    <BiUpload />
                  </div>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default FeedCard