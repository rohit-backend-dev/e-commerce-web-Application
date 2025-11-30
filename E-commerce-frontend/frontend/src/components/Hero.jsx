// import React from 'react';
// import { assets } from '../assets/assets';
// import { useNavigate } from 'react-router-dom';

// const Hero = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="relative flex flex-col-reverse sm:flex-row items-center justify-between bg-gradient-to-r from-gray-50 to-gray-200 border-b border-gray-300 overflow-visible min-h-[550px] sm:min-h-[600px]">

//       {/* Hero Left */}
//       <div className="w-full sm:w-1/2 flex flex-col items-start justify-center px-6 sm:px-16 py-10 sm:py-20 z-10">
//         <div className="text-gray-800 space-y-4">
//           <div className="flex items-center gap-2">
//             <div className="w-12 h-[2px] bg-gray-800"></div>
//             <p className="font-medium text-sm md:text-base uppercase tracking-wider">Our Bestseller</p>
//           </div>

//           <h1 className="text-4xl sm:text-5xl lg:text-6xl font-prata font-bold leading-tight">
//             Latest Arrival
//           </h1>

//           <p className="text-gray-600 max-w-md">
//             Discover our newest products and elevate your style with the latest trends.
//           </p>

//           <div className="flex items-center gap-4 mt-6">
//             <button
//               onClick={() => navigate('/collection')}
//               className="px-6 py-2 bg-gray-900 text-white font-semibold text-sm md:text-base uppercase tracking-wide rounded hover:bg-gray-700 transition duration-300"
//             >
//               Shop Now
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Hero Right - Improved visibility */}
//       <div className="w-full sm:w-1/2 flex items-center justify-center relative overflow-visible">
//         {/* Floating background shapes */}
//         <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-yellow-300 rounded-full opacity-30 -top-16 -right-16 animate-float1 -z-10"></div>
//         <div className="absolute w-64 h-64 sm:w-80 sm:h-80 bg-pink-300 rounded-full opacity-30 -bottom-16 -left-12 animate-float2 -z-10"></div>

//         <div className="relative flex items-center justify-center w-full sm:w-auto">
//           {/* Main Hero Image */}
//           <div className="relative transform transition-transform duration-500 hover:-translate-y-3 hover:scale-105">
//             <img
//               className="w-64 sm:w-80 lg:w-[500px] rounded-3xl shadow-2xl border border-gray-200 object-cover"
//               src={assets.hero_img}
//               alt="Hero"
//             />
//             <div className="absolute -top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
//               Hot
//             </div>
//           </div>

//           {/* Latest Image */}
//           <div className="absolute -bottom-12 -right-20 w-40 sm:w-48 lg:w-56 rounded-2xl shadow-2xl border-4 border-white bg-white transform rotate-3 transition-transform duration-500 hover:rotate-0 hover:-translate-y-3 hover:scale-105">
//             <img
//               className="w-full h-full object-cover rounded-2xl"
//               src={assets.latest_img}
//               alt="Latest"
//             />
//             <div className="absolute -top-3 -left-3 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
//               New
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;


import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const bgImages = [
  "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=60&w=1600",
  "https://images.unsplash.com/photo-1629426958003-35a5583b2977?auto=format&fit=crop&q=60&w=1600",
  "https://images.unsplash.com/photo-1642764873654-9eef0467b342?auto=format&fit=crop&q=60&w=1600",
  "https://images.unsplash.com/photo-1588795904317-2f4ab1a0a852?auto=format&fit=crop&q=60&w=1600",
];

const Hero = () => {
  const navigate = useNavigate();
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const leftVariant = {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  const rightVariant = {
    hidden: { opacity: 0, x: 80 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  return (
    <section className="relative flex flex-col-reverse sm:flex-row items-stretch justify-between overflow-hidden min-h-[460px] sm:min-h-[560px] bg-white text-gray-900">
      {/* LEFT BACKGROUND IMAGE */}
      <motion.div
        key={bgIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute left-0 top-0 bottom-0 w-full sm:w-1/2 z-0"
        style={{
          backgroundImage: `url(${bgImages[bgIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.7)",
        }}
      ></motion.div>

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 sm:w-1/2 bg-gradient-to-r from-black/80 via-black/60 to-transparent z-0"></div>

      {/* LEFT CONTENT */}
      <motion.div
        variants={leftVariant}
        initial="hidden"
        animate="visible"
        className="w-full sm:w-1/2 flex flex-col justify-center px-6 sm:px-12 py-10 sm:py-16 relative z-10 text-white"
      >
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight drop-shadow-lg">
            Latest Arrival
          </h1>
          <p className="text-gray-200 max-w-md text-lg leading-relaxed">
            Discover our newest collection — where comfort meets timeless
            craftsmanship and effortless design.
          </p>
          <motion.button
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/collection")}
            className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg"
          >
            Shop Now →
          </motion.button>
        </div>
      </motion.div>

      {/* RIGHT IMAGE CLUSTER */}
      <motion.div
        variants={rightVariant}
        initial="hidden"
        animate="visible"
        className="w-full sm:w-1/2 flex items-center justify-center relative z-10 px-6 sm:px-10 py-10 sm:py-16 bg-gradient-to-br from-gray-50 to-gray-100"
      >
        <div className="relative w-fit">
          {/* MAIN IMAGE */}
          <motion.div
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200"
          >
            <img
              src={assets.hero_img}
              alt="Main Model"
              className="w-64 sm:w-80 md:w-[360px] h-auto object-cover rounded-3xl"
            />
            <div className="absolute top-3 left-3 bg-white/80 text-black text-xs font-semibold px-3 py-1 rounded-md backdrop-blur-sm">
              Featured
            </div>
          </motion.div>

          {/* TOP-RIGHT SMALL IMAGE */}
          <motion.div
            whileHover={{ scale: 1.08, y: -4 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="absolute -top-6 -right-6 sm:-top-7 sm:-right-7 rounded-2xl overflow-hidden shadow-xl border-[3px] border-gray-200"
          >
            <img
              src={assets.latest_img}
              alt="Latest"
              className="w-28 sm:w-36 h-28 sm:h-36 object-cover rounded-2xl"
            />
            <div className="absolute top-2 left-2 bg-white/80 text-black text-[11px] font-semibold px-2 py-[2px] rounded-md">
              New
            </div>
          </motion.div>

          {/* BOTTOM-LEFT SMALL IMAGE */}
          <motion.div
            whileHover={{ scale: 1.08, y: 4 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="absolute -bottom-6 -left-6 sm:-bottom-7 sm:-left-7 rounded-2xl overflow-hidden shadow-xl border-[3px] border-gray-200"
          >
            <img
              src="https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=600&q=80"
              alt="Trending"
              className="w-28 sm:w-36 h-28 sm:h-36 object-cover rounded-2xl"
            />
            <div className="absolute top-2 left-2 bg-white/80 text-black text-[11px] font-semibold px-2 py-[2px] rounded-md">
              Trend
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
