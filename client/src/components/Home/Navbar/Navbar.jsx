import React, { useState } from 'react'
import { Brain } from 'lucide-react'
import { Menu } from 'lucide-react'
import { X } from 'lucide-react'
import { Link } from 'react-router'

export const Navbar = () => {

  const [open, setOpen] = useState(false)

  const links = [
    {
      name: 'Features',
      link: '/features'
    },
    {
      name: 'How it Works',
      link: '/working'
    },
    {
      name: 'Login',
      link: '/login'
    }
  ]
  return (
    <nav className='flex justify-between items-center px-10 py-5'>
        <div className='flex items-center  gap-6'>
            <Brain className='' size={42} color='#6366f1' />
            <h3 className=' text-base ml-[-9px] w-30 sm:w-fit whitespace-normal md:text-xl lg:text-xl font-semibold'>AI Resume Analyzer</h3>
        </div>
        
        
        <div className='hidden lg:flex lg:flex-row  gap-13  justify-end items-center'>
           {links.map((link, index)=>{
            return(
              <Link key={index} to={link.link} className='text-lg tracking-wider font-semibold xl:text-lg whitespace-nowrap hover:text-gray-300'>{link.name}</Link>
            )
           })}
            <Link to="/get-started"><button className='bg-primary text-white text-lg xl:text-lg whitespace-nowrap font-bold  py-2 px-4 mb-1 hover:bg-primary/80 rounded '>Get Started</button></Link>
        </div>
        
        <div onClick={() => setOpen(!open)}  className='block absolute z-10 top-6 right-6 lg:hidden '>
          {open ? <X size={42} color='#6366f1' /> : <Menu size={42} color='#6366f1' />}
        </div>

        <div className={open ? 'absolute top-0 left-0 w-full h-60  bg-black/70 flex flex-col justify-center items-center ' : 'hidden'}>
        <div className='flex flex-col gap-3 justify-center items-center top-10'>
          {links.map((link, index)=>{
            return(
              <Link key={index} to={link.link} className='text-lg xl:text-lg whitespace-nowrap hover:text-gray-300'>{link.name}</Link>
            )
          })}
          <Link to="/get-started"><button className='bg-primary text-white text-lg xl:text-lg whitespace-nowrap font-bold  py-2 px-4 mb-1 hover:bg-primary/80 rounded '>Get Started</button></Link>
        </div>
        </div>
        
    </nav>
  )
}
