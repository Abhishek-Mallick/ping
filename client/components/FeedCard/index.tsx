import Image from 'next/image'
import React from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { BiMessageRounded, BiUpload } from 'react-icons/bi'
import { FaRetweet } from 'react-icons/fa6'
import { Ping } from "@/gql/graphql"

interface FeedCardProps {
  data: Ping     
}

const FeedCard: React.FC<FeedCardProps> = (props) => {
  const { data } = props
  return (
    <div className='border border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer border-r-0 border-l-0 border-b-0'>
        <div className='grid grid-cols-12 gap-3'>
            <div className='col-span-1'>
                {data.author?.profileImageURL && <Image src={data.author.profileImageURL} className="rounded-full" alt="user-image" height={50} width={50} />}
            </div>
            <div className='col-span-11'>
                <h5>{data.author?.firstName} {data.author?.lastName}</h5>
                <p>{data.content}</p>

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