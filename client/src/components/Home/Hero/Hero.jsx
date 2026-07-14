import React from 'react'
import { HeroLeft } from './Hero Left/HeroLeft'
import { HeroRight } from './Hero Right/HeroRight'
import { HeroBottom } from './Hero Bottom/HeroBottom'

export const Hero = () => {
  return (
    <div className='px-17 py-5 '>
    <div className='flex'>
        <HeroLeft/>
        <HeroRight />
        
    </div>
    <HeroBottom />
    </div>
  )
}
