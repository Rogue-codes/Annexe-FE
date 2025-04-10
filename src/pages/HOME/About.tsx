import React from 'react'
import { about } from '../../assets'

export default function About() {
  return (
    <div className='h-[537px] relative w-full'>
      <div className='w-full h-full absolute left-0 top-0'>
        <img src={about} className='w-full h-full object-cover' alt="" />
      </div>

      <div className='w-full h-full relative gap-44 z-[555] flex justify-center items-center'>
        <div className='w-[20%]'>
            <h1 className='text-[7rem] leading-24 font-bold text-black'>About Annexe Auction</h1>
        </div>
        <div className='w-[30%] text-xl leading-8'>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pulvinar interdum enim a vestibulum, nunc cras. Gravida morbi sit sed egestas cursus risus imperdiet bibendum nisl. Nullam amet nec aliquam habitasse. Porttitor in risus, vitae ornare vitae sit pellentesque sceleris.
                
            </p>
            <button className='border-2 mt-6 text-lg py-2 px-6 hover:bg-[#004663] hover:text-white transition-all cursor-pointer'>Learn more</button>
        </div>
      </div>
    </div>
  )
}
