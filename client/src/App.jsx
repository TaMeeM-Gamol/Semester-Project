import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import ChatBox from "./pages/ChatBox";
import Connections from "./pages/Connections";
import Discover from "./pages/Discover";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import Messages from "./pages/Messages";
import { useUser ,useAuth} from "@clerk/react";
import Layout from "./pages/Layout";
import {Toaster} from "react-hot-toast"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "./features/user/userSlice";
import { fetchConnections } from "./features/connections/connectionSlice";


const App = () => {
  const { user } = useUser()
  const {getToken} = useAuth()

  const dispatch = useDispatch()

  useEffect(()=>{
    const fetchData = async () => {
      if (user) {
      const token = await getToken()
      dispatch(fetchUser(token))
      dispatch(fetchConnections(token))
     }
    }
    fetchData()

  },[user, getToken, dispatch])
  return (
    <>
      <Toaster/>
      <Routes>
        <Route path="/" element={!user ? <Login/> : <Layout/>}>
          <Route index element={<Feed/>} />
            <Route path='messages' element={<Messages/>} />
             <Route path='messages/:userId' element= {<ChatBox/>}/>
              <Route path='Connections' element={<Connections />} />
               <Route path='Discover' element={<Discover/>} />
                <Route path='Profile' element={<Profile/>} />
                 <Route path='Profile/:profileId' element={<Profile/>} />
                  <Route path='create-Post' element={<CreatePost/>} />
        </Route>
      </Routes>
    </>
  )
} 
export default App;