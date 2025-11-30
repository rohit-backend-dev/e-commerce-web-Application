import React from 'react';
import { assets } from '../assets/assets';

const OurPolicy = () => {
  return (
    <section className="bg-white py-20 border-t border-gray-100">
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 tracking-tight">
          Our Commitments
        </h2>
        <p className="text-gray-500 text-base sm:text-lg mt-3">
          We promise comfort, quality, and care — every step of the way.
        </p>
      </div>

      {/* Icons Row */}
      <div className="flex flex-wrap justify-center items-center gap-x-20 gap-y-12 px-6">
        {/* Easy Exchange */}
        <div className="flex flex-col items-center text-center transition-transform duration-300 hover:scale-105">
          <div className="bg-gray-50 p-5 rounded-full shadow-sm hover:shadow-md transition-all duration-300">
            <img
              src={assets.exchange_icon}
              alt="Easy Exchange"
              className="w-16 sm:w-20"
            />
          </div>
          <p className="text-gray-800 text-base sm:text-lg font-medium mt-4">
            Easy Exchange
          </p>
          <p className="text-gray-500 text-sm mt-1 max-w-[200px]">
            Hassle-free exchange within 7 days.
          </p>
        </div>

        {/* Premium Quality */}
        <div className="flex flex-col items-center text-center transition-transform duration-300 hover:scale-105">
          <div className="bg-gray-50 p-5 rounded-full shadow-sm hover:shadow-md transition-all duration-300">
            <img
              src={assets.quality_icon}
              alt="High Quality"
              className="w-16 sm:w-20"
            />
          </div>
          <p className="text-gray-800 text-base sm:text-lg font-medium mt-4">
            Premium Quality
          </p>
          <p className="text-gray-500 text-sm mt-1 max-w-[200px]">
            Curated products made to last.
          </p>
        </div>

        {/* 24/7 Support */}
        <div className="flex flex-col items-center text-center transition-transform duration-300 hover:scale-105">
          <div className="bg-gray-50 p-5 rounded-full shadow-sm hover:shadow-md transition-all duration-300">
            <img
              src={assets.support_img}
              alt="Customer Support"
              className="w-16 sm:w-20"
            />
          </div>
          <p className="text-gray-800 text-base sm:text-lg font-medium mt-4">
            24/7 Support
          </p>
          <p className="text-gray-500 text-sm mt-1 max-w-[200px]">
            We’re here whenever you need us.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurPolicy;
