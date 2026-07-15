import React from 'react'
import { HeroLeft } from './Hero Left/HeroLeft'
import { HeroRight } from './Hero Right/HeroRight'
import { HeroBottom } from './Hero Bottom/HeroBottom'

export const Hero = () => {
  return (
    <div className='mt-10 sm:mt-10 lg:mt-0'>
    <div className='flex xl:flex-row flex-col justify-start items-center'>
        <HeroLeft/>
        <HeroRight />
        
    </div>
    <HeroBottom />
    </div>
  )
}
