import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Bookmark, MessageCircle, MoreHorizontal, Send } from 'lucide-react'
import { Button } from './ui/button'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentDialoge from './CommentDialoge'

const Post = () => {

    const [text, setText] = useState("");
    const [open, setOpen] = useState(false);

    const changeEventHandler = (e) => {
        const inputText = e.target.value;
        if (inputText.trim()) {
            setText(inputText);
        } else {
            setText("");
        }
    }
    return (
        <div className='my-8 w-full max-w-sm mx-auto'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <Avatar className="h-6 w-6">
                        <AvatarImage src="https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <h1>Jahan Khokhar</h1>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <MoreHorizontal className='cursor-pointer' />
                    </DialogTrigger>
                    <DialogContent className="flex flex-col text-sm items-center text-center border-none bg-amber-50">
                        <Button variant='ghost' className="cursor-pointer w-fit text-[#ED4956] font-bold border-none hover:bg-[#d5cdcd] hover:text-black">unFollow</Button>
                        <Button variant='ghost' className="cursor-pointer w-fit border-none hover:bg-[#d5cdcd] hover:text-black">Add to Favourite</Button>
                        <Button variant='ghost' className="cursor-pointer w-fit text-[#ED4956] font-bold border-none hover:bg-[#d5cdcd] hover:text-black">Report</Button>
                    </DialogContent>
                </Dialog>
            </div>
            <img
                className='rounded-sm my-2 w-full aspect-square object-cover'
                src="https://images.unsplash.com/photo-1745565086938-06a209614d5d?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Post" srcset="" />
            <div>
                <div className='flex items-center justify-between my-2'>
                    <div className='flex items-center  my-2 gap-3'>
                        <FaRegHeart size={'22px'} className='cursor-pointer hover:text-gray-600' />
                        <MessageCircle onClick={() => setOpen(true)} className='cursor-pointer hover:text-gray-600' />
                        <Send className='cursor-pointer hover:text-gray-600' />
                    </div>
                    <Bookmark className='cursor-pointer hover:text-gray-600' />
                </div>
            </div>
            <span className='font-medium block mb-2'>1267 likes</span>
            <p>
                <span className='font-medium mr-2'>Farah Khokhar</span>
                Comment...
            </p>
            <span onClick={() => setOpen(true)} className='cursor-pointer text-sm text-gray-400'>view all 10 comments</span>
            <CommentDialoge open={open} setOpen={setOpen}/>
            <div className='flex items-center justify-between'>
                <input type="text"
                    placeholder='Add a comment'
                    onChange={changeEventHandler}
                    value={text}
                    className='outline-none w-full text-sm'
                />
                {
                    text &&  <span className='text-[#3BADF8]'>Post</span>
                }
            </div>
        </div>
    )
}

export default Post
