// src/components/SpinAndWinModal.jsx
import React from "react";
import Wheel from "./Wheel";
import { motion } from "framer-motion";

const SpinAndWinModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
    >
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-md">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>
        <h2 className="text-center text-2xl font-semibold text-pink-700 mb-4">
          🎉 Spin & Win Coupon 🎉
        </h2>
        <Wheel onClose={onClose} />
      </div>
    </motion.div>
  );
};

export default SpinAndWinModal;
