import React from 'react'
import hero from '../assets/hero.png'
const Hero = () => {
  return (
    <div>
      <h2 className="text-4xl font-bold text-center font-[Poppins]"
      >Spotlight</h2>
      <div className=" sm:w-[90%]  h-[50vh] mx-auto my-10">
        <img src={hero} className="w-full  max-w-full " alt="" />
      </div>
    </div>
  )
}

export default Hero
