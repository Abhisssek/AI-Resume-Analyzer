import React from 'react'

export const HeroBottom = () => {
  return (
    <div className='px-17 mt-15 py-10  hidden sm:block '>
      <div className='flex gap-3 mx-auto lg:m-0 w-fit'>
        <div className='w-fit px-7 py-1 flex flex-col items-center justify-center h-30 border-1 rounded-lg  border-[#2b2b53]'>
          <h1 className='text-3xl font-bold mb-1 text-primary'>95%</h1>
          <h3 className='text-xl text-center text-[#abb0be] font-semibold'>Accuracy</h3>
        </div>
        <div className='w-fit px-7 py-1 flex flex-col items-center justify-center h-30 border-1 rounded-lg  border-[#2b2b53]'>
          <h1 className='text-3xl font-bold mb-1 text-primary'>10+</h1>
          <h3 className='text-xl text-center text-[#abb0be] font-semibold'>Resume Analyzed</h3>
        </div>
        <div className='w-fit flex px-7 py-1 flex-col items-center justify-center h-30 border-1 rounded-lg  border-[#2b2b53]'>
          <h1 className='text-3xl font-bold mb-1 text-primary'>6+</h1>
          <h3 className='text-xl text-center text-[#abb0be] font-semibold'>Happy Users</h3>
        </div>
        
      </div>
    </div>
  )
}
