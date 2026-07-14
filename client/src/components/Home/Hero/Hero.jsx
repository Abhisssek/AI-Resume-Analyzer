import React from 'react'
import { HeroLeft } from './Hero Left/HeroLeft'
import { HeroRight } from './Hero Right/HeroRight'
import { HeroBottom } from './Hero Bottom/HeroBottom'

export const Hero = () => {
  return (
    <div className=''>
    <div className='flex lg:flex-row flex-col justify-between gap-5'>
        <HeroLeft/>
        <HeroRight />
        
    </div>
    <HeroBottom />
    </div>
  )
}
