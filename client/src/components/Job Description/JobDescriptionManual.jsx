import React from 'react'

export const JobDescriptionManual = () => {
  return (
    <div>
       <div>
         <div>
            <label htmlFor="">Job Title</label>
            <input type="text" placeholder='Enter Job Title' />
            
        </div>
        <div>
            <label htmlFor="">Company Name</label>
            <input type="text" placeholder='Enter Company Name' />
        </div>
       </div>
       <div>
        <label htmlFor="">Job Description</label>
        <textarea name="" id="" cols="30" rows="10" placeholder='Enter Job Description'></textarea>
       </div>

    </div>
  )
}
