import React, { useEffect, useState } from 'react'
import { assets, dummyPostsData } from '../assets/assets'
import Loading from '../components/Loading'
import StoriesBar from '../components/storiesBar'
import PostCard from '../components/PostCard'
import RecentMessages from '../components/RecentMessages'
const Feed = () => {

  const [feeds,setfeeds]= useState([])
  const [Loading,setLoading]=useState(true)

  const fetchfeeds = async () =>{
    setfeeds(dummyPostsData)
    setLoading(false)
  }

  useEffect(()=> {
    fetchfeeds()
  },[])

  return !Loading ? (
    <div className='h-full overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8'>
      {/* {stories and post list} */}
      <div>
         <StoriesBar />

        <div className='p-4 space-y-6'>
          {feeds.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>

      </div>

      {/* {right sidebar} */}

      <div className='max-xl-hidden sticky top-0 '>

        <div className='max-w-xs bg-white text-xs p-4 rounded-md inline-flex flex-col gap-2 shadow'>
          <h3 className='text-slate-800 font-semibold'>sponsored</h3>
          <img src={assets.sponsored_img} className='w-75 h-50 rounded-md' alt="" />
          <p className='text-slate-600'>Email Marketing</p>
          <p className='text-slate-800'>Supercharge your marketing with a powerful, easy-to-use platform built for results </p>
        </div>

        <RecentMessages/>

      </div>
    </div>
  ) : <loading/>
}

export default Feed
