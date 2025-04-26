import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'

const sideBarItems = [
  { icons: <Home />, text: "Home" },
  { icons: <Search />, text: "Search" },
  { icons: <TrendingUp />, text: "Explore" },
  { icons: <MessageCircle />, text: "Messages" },
  { icons: <Heart />, text: "Notification" },
  { icons: <PlusSquare />, text: "Create" },
  {
    icons: (
      <Avatar className='w-6 h-6'>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>PR</AvatarFallback>
      </Avatar>
    ), text: "Profile"
  },
  { icons: <LogOut />, text: "Logout" }
]

const LeftSideBar = () => {
   const navigate = useNavigate();

   const logoutHandler = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/v1/user/logout',{withCredentials:true});
      if(res.data.success){
        navigate("/login");
       toast.success(res.data.message); 
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
   }

   const sidebarHandler = (textType) => {
    if( textType == 'Logout') logoutHandler();
   }
  return (
    <div className='fixed top-0 left-0 z-10 w-[16%] h-screen border-r border-gray-300 px-4 py-6 bg-white'>
      <div className='flex flex-col gap-6'>
        <h1 className='text-2xl font-bold mb-4'>Logo</h1>
        <div className='flex flex-col gap-2'>
          {
            sideBarItems.map((item, index) => (
              <div
                key={index} onClick={() => sidebarHandler(item.text)}
                className='flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-gray-100 transition cursor-pointer'
              >
                <div className='text-[20px]'>{item.icons}</div>
                <span className='text-sm font-medium'>{item.text}</span>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default LeftSideBar
