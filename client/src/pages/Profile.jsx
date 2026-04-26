import React, { useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import { dummyPostsData, dummyUserData } from '../assets/assets'
import Loading from '../components/Loading'
import UserProfileInfo from '../components/userProfileInfo'
import PostCard from '../components/PostCard'
import moment from 'moment'
import ProfileModal from '../components/ProfileModal'
const Profile = () => {
  const{profileId} = useParams()
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [activeTab, setActiveTab] = useState('posts')
  const [showEdit, setShowEdit] = useState(false)

  const fetchUser = async () => {
    setUser(dummyUserData)
    setPosts(dummyPostsData)
  }
   useEffect(()=>{
    fetchUser()
   },[])

    function timeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  const intervals = [
    { label: "y", seconds: 31536000 },
    { label: "mo", seconds: 2592000 },
    { label: "w", seconds: 604800 },
    { label: "d", seconds: 86400 },
    { label: "h", seconds: 3600 },
    { label: "m", seconds: 60 },
  ];

  for (let i = 0; i < intervals.length; i++) {
    const interval = Math.floor(seconds / intervals[i].seconds);
    if (interval >= 1) {
      return `${interval}${intervals[i].label}`;
    }
  }

  return "now";
}

  return user ? (
    <div className='relative h-full overflow-y-scroll bg-gray-50 p-6'>
      <div className='max-w-3xl mx-auto'>
        {/* {profile card} */}
        <div className='bg-white rounded-2xl shadow overflow-hidden'>
          {/* {cover photo} */}
          <div className='h-40 md:h-56 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200'>
            {user.cover_photo && <img src={user.cover_photo} alt='' className='w-full h-full object-cover'/>}
          </div> 
          {/* {user info} */}
          <UserProfileInfo user={user} posts={posts} profileId={profileId} setShowEdit={setShowEdit}/>
        </div>

        {/* {tabs} */}
        <div className='mt-6'>
          <div className='bg-white rounded-xl shadow p-1 flex max-w-md mx-auto'>
            {["posts", "media", "likes"].map((tap)=>(
              <button onClick={()=> setActiveTab(tap)} key={tap} className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer
                 ${activeTab === tap ?"bg-indigo-600 text-white" :"text-gray-600 hover:text-gray-900"}`}>
                  {tap.charAt(0).toUpperCase() + tap.slice(1)}
                 </button>
            ))}
          </div>

          {/* {posts} */}
          {activeTab === 'posts' && (
            <div className='mt-6 flex flex-col items-center gap-6'>
              {posts.map((post)=> <PostCard key={post._id} post={post}/>)}
            </div>
          )}

          {/* {media} */}
        {activeTab === "media" && (
    <div className="flex flex-wrap mt-6 mx-auto gap-2">
      {Array.isArray(posts) && posts.filter((post) => post.image_urls && post.image_urls.length > 0).map((post) =>
          post.image_urls.map((img, index) => (

            <div key={post._id + index} className="relative w-40 h-40 rounded-lg overflow-hidden group cursor-pointer">
              <img src={img} alt="" className="w-full h-full object-cover"/>

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300"></div>

              <p className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition duration-300">
                {timeAgo(post.createdAt)}
              </p>
            </div>
          ))
        )}
      </div>
)}
        </div>
      </div>
      {/* {edit profile modal} */}
      {showEdit && <ProfileModal setShowEdit={setShowEdit}/>}
    </div>
  ) : (<Loading/>)
}

export default Profile
