import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Link } from 'react-router-dom'
import { MoreHorizontal } from 'lucide-react'


const CommentDialoge = ({ open, setOpen }) => {
  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside={() => setOpen(false)} className="bg-amber-50 p-0 flex flex-col max-w-5xl">
        <div className='flex flex-1'>
          <div className='w-1/2'>
            <img src="https://images.unsplash.com/photo-1745565086938-06a209614d5d?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Post" className='w-full h-full object-cover rounded-l-lg'
            />
          </div>

          <div className='w-1/2 flex flex-col justify-between'>
            <div className='flex items-center justify-between'>
              <div className='flex gap-3 items-center'>
              <Link>
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
              <div>
                <Link className="font-semibold text-xs">username</Link>
                {/* <span>Bio here..</span> */}
              </div>
              </div>
             <Dialog>
              <DialogTrigger asChild>
                <MoreHorizontal/>
              </DialogTrigger>
             </Dialog>

            </div>
          </div>
        </div>

      </DialogContent>
    </Dialog>
  )
}

export default CommentDialoge
