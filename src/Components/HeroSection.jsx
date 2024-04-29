import React from 'react';
import heroSectionImage from "../assets/hero.png"

const HeroSection = () => {
  return (
    <div className="grid md:grid-cols-2 items-center md:gap-8 gap-6 font-[sans-serif] text-[#333] max-w-5xl max-md:max-w-md mx-auto mt-10">
      <div className="max-md:order-1 max-md:text-center">
        <h2 className="md:text-4xl text-3xl md:leading-10 font-extrabold text-[#333] mb-4">Discover Your Next Phone</h2>
        <p className="mt-4 text-base text-[#666] leading-relaxed">Welcome to PhoneFinder, your one-stop destination for discovering the perfect smartphone to suit your needs.</p>
        <div className="mt-8 flex max-sm:flex-col sm:space-x-4 max-sm:space-y-6">
          <a href="#main-module" className="px-6 py-3 text-base font-semibold text-white bg-[#011c2b] rounded-full hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-[#011c2b] focus:outline-none focus:ring-opacity-50">Explore Our Menu</a>
          <a href="#about-us" className="px-6 py-3 text-base font-semibold text-[#011c2b] border border-[#011c2b] rounded-full hover:text-white hover:bg-[#011c2b] transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-[#011c2b] focus:outline-none focus:ring-opacity-50">About Us</a>
        </div>
      </div>
      <div className="md:h-[650px]">
        <img src={heroSectionImage} className="w-full h-full object-cover rounded-lg " alt="Dining Experience" />
      </div>
    </div>
  )
}

export default HeroSection