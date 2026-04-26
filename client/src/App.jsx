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
import { useUser } from "@clerk/react";
import Layout from "./pages/Layout";
import {Toaster} from "react-hot-toast"

const App = () => {
  const { user } = useUser();

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