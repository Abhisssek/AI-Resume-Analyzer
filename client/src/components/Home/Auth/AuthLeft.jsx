import React, { useState } from 'react'
import { Brain } from 'lucide-react'
// import person1 from '../../../../assets/img/protagonist1-removebg-preview.png'

export const AuthLeft = ({title, description, image}) => {


  return (
    <div className='px-15 py-10 bg-[#071632] xl:w-2/5 h-screen flex flex-col  '>
        <div className='flex  items-center gap-3'>
             <Brain className='' size={42} color='#6366f1' />
             <h2 className='text-2xl font-bold'>AI Resume Analyzer</h2>
        </div>
        <div className='mt-20 text-center  xl:text-start w-full xl:w-4/5'>
            <h3 className=' text-2xl sm:text-4xl xl:text-5xl font-bold tracking-wide mb-7 '>{title}</h3>
            <p className='w-9/10 xl:mx-0 mx-auto xl:w-110 text-xl  sm:text-4xl xl:text-2xl tracking-tight text-s-primary leading-10'>{description}</p>
        </div>
        <div>
            <img className='w-90 mt-10 xl:mx-0 mx-auto' src={image} alt="" />
        </div>
    </div>
  )
}
