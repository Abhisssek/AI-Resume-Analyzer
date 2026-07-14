import React from 'react'
import { Navbar } from './Navbar/Navbar'
import { Hero } from './Hero/Hero'

export const Home = () => {
  return (
    <div className='w-full h-full'>
        <Navbar/>
        <Hero />
    </div>
  )
}
