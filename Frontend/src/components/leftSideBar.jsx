import { Heart, Home, LogOut, MessageCircle, PlaySquare, Search, TrendingUp } from 'lucide-react'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const sideBarItems = [
  { icons: <Home />, text: "Home" },
  { icons: <Search />, text: "Search" },
  { icons: <TrendingUp />, text: "Explore" },
  { icons: <MessageCircle />, text: "Messages" },
  { icons: <Heart />, text: "Notification" },
  { icons: <PlaySquare />, text: "Create" },
  {
    icons: (
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ), text: "Profile"
  },
  { icons: <LogOut />, text: "Logout" }
]

const LeftSideBar = () => {
  return (
    <div className='fixed top-0 z-10 left-0 px-4 border-r border-gray-300 w-[16%] h-screen'>
     <div className='flex flex-col'>
        <h1>Logo</h1>
        <div>
        {
        sideBarItems.map((item, index) => (
          <div key={index} className='flex items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3'>
            {item.icons}
            <span>{item.text}</span>
          </div>
        ))
      }
        </div>
     </div>
    </div>
  )
}

export default LeftSideBar
