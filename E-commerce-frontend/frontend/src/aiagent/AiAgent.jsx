import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const AiAgent = () => {
  const navigate = useNavigate();

  return (
    <motion.button
      onClick={() => navigate("/assistant")}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.4, type: "spring", stiffness: 150 }}
      className="flex items-center gap-3 px-5 py-3 rounded-2xl 
                 bg-gradient-to-r from-purple-600 to-pink-500 text-white 
                 shadow-lg hover:shadow-2xl focus:outline-none focus:ring-4 
                 focus:ring-pink-300 transition-all duration-300 relative overflow-hidden group"
      aria-label="AI Shopping Assistant"
      title="Let AI shop for you"
    >
      {/* Icon */}
      <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/20 group-hover:bg-white/30 transition-all duration-300">
        <MessageCircle className="w-5 h-5 text-white animate-pulse" />
      </div>

      {/* Text */}
      <div className="flex flex-col text-left leading-tight">
        <span className="text-sm font-semibold">AI Shopping Agent</span>
        <span className="text-xs text-white/80">Find your perfect style ✨</span>
      </div>

      {/* Glow Animation Layer */}
      <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-400 to-purple-400 opacity-20 blur-md" />
    </motion.button>
  );
};

export default AiAgent;
