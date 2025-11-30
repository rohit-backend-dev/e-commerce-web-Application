import React from "react";
import { useNavigate } from "react-router-dom";
import { Gift } from "lucide-react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import NewsletterBox from "../components/NewsletterBox";
import AiAgent from "../aiagent/AiAgent";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden relative">
      {/* 🎡 Spin & Win + AI Agent Row */}
      <div className="flex justify-center items-center gap-6 mt-10 mb-10 flex-wrap">
        {/* Spin & Win Button */}
        <button
          onClick={() => navigate("/spin-wheel")}
          className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white 
                     px-6 py-2.5 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 
                     transition-all duration-300 ease-in-out"
        >
          <Gift className="w-5 h-5" />
          <span className="font-semibold">Spin & Win</span>
        </button>

        {/* AI Agent Button */}
        <AiAgent />
      </div>

      {/* 🏠 Rest of the Home Page */}
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsletterBox />
    </div>
  );
};

export default Home;
