// src/components/Wheel.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { getRandomCoupon, saveCouponToLocalStorage } from "../utils/Coupon";
import { createConfetti } from "./confetti";
import Share from "./Share";

const MAX_SPINS_PER_DAY = 3;

const Wheel = ({ onClose }) => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [spinsLeft, setSpinsLeft] = useState(0);

  // Initialize daily spins
  useEffect(() => {
    const today = new Date().toLocaleDateString();
    const stored = JSON.parse(localStorage.getItem("spinData")) || {};
    if (stored.date === today) {
      setSpinsLeft(stored.spinsLeft ?? MAX_SPINS_PER_DAY);
    } else {
      localStorage.setItem("spinData", JSON.stringify({ date: today, spinsLeft: MAX_SPINS_PER_DAY }));
      setSpinsLeft(MAX_SPINS_PER_DAY);
    }
  }, []);

  const updateSpinsLeft = (newCount) => {
    const today = new Date().toLocaleDateString();
    localStorage.setItem("spinData", JSON.stringify({ date: today, spinsLeft: newCount }));
    setSpinsLeft(newCount);
  };

  const handleSpin = () => {
    if (spinning) return;
    if (spinsLeft <= 0) {
      toast.error("🚫 No spins left for today!");
      return;
    }

    setSpinning(true);
    setResult(null);
    updateSpinsLeft(spinsLeft - 1);

    setTimeout(() => {
      const coupon = getRandomCoupon();
      saveCouponToLocalStorage(coupon);
      setResult(coupon);
      createConfetti();
      toast.success(`🎉 You won ${coupon.code}!`);
      setSpinning(false);
    }, 3000);
  };

  const handleShared = () => {
    const today = new Date().toLocaleDateString();
    const stored = JSON.parse(localStorage.getItem("spinData")) || {};
    if (stored.date === today) {
      if (stored.spinsLeft < MAX_SPINS_PER_DAY) {
        const newCount = stored.spinsLeft + 1;
        updateSpinsLeft(newCount);
        toast.success("🎁 You earned +1 spin for sharing!");
      } else {
        toast("✨ You already have maximum spins for today!");
      }
    }
  };

  const getDiscountText = (coupon) => {
    return coupon.type === "flat" ? `$${coupon.value} OFF` : `${coupon.value}% OFF`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-100 via-pink-50 to-yellow-100 flex items-center justify-center p-6">
  <div className="w-full max-w-4xl">
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 overflow-hidden border border-white/40 flex flex-col md:flex-row items-center gap-8"
    >
      {/* Gradient Blurs */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-pink-300 rounded-full blur-3xl opacity-40 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-300 rounded-full blur-3xl opacity-40 -z-10"></div>

      {/* 🎡 Left - Wheel */}
      <div className="flex flex-col items-center justify-center md:w-1/2">
        <motion.div
          animate={{
            rotate: spinning ? [0, 360, 720, 1080, 1440] : 0,
          }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="relative w-56 h-56 mb-6"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-400 via-fuchsia-500 to-yellow-400 shadow-lg"></div>
          <div className="absolute inset-3 rounded-full bg-white flex items-center justify-center overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1/2 h-1 origin-right"
                style={{
                  transform: `rotate(${i * 45}deg)`,
                  background: i % 2 === 0 ? "#ec4899" : "#a855f7",
                }}
              />
            ))}
            <div className="absolute inset-6 rounded-full bg-gradient-to-br from-fuchsia-600 to-purple-600 flex items-center justify-center shadow-inner">
              <span className="text-5xl">🎁</span>
            </div>
          </div>
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-pink-600 drop-shadow-xl z-10"></div>
        </motion.div>

        <AnimatePresence mode="wait">
          {!result ? (
            <motion.button
              key="spin"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onClick={handleSpin}
              disabled={spinning || spinsLeft <= 0}
              className="bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50"
            >
              {spinning ? "SPINNING..." : "SPIN NOW 🎉"}
            </motion.button>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-300 rounded-2xl p-6 mb-4">
                <p className="text-sm text-gray-600 mb-1">🎊 Congratulations!</p>
                <p className="text-3xl font-bold text-green-600">{result.code}</p>
                <p className="text-lg font-semibold text-green-700 mt-1">
                  {getDiscountText(result)}
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  Apply this coupon at checkout!
                </p>
              </div>
              <button
                onClick={onClose}
                className="bg-gray-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-all"
              >
                Close & Shop Now
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 🧾 Right - Text Section */}
      <div className="text-center md:text-left md:w-1/2 space-y-4">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-fuchsia-600 to-purple-600 bg-clip-text text-transparent mb-2 drop-shadow">
          🎡 Spin & Win
        </h2>
        <p className="text-gray-600 text-sm">
          You have{" "}
          <span className="font-semibold text-purple-600">{spinsLeft}</span>{" "}
          spins left today!
        </p>
        <p className="text-gray-700 text-base leading-relaxed">
          Try your luck and win exciting discount coupons. Share to earn an extra spin!
        </p>

        {/* Share Section */}
        <div className="pt-4">
          <Share onShared={handleShared} />
        </div>
      </div>
    </motion.div>
  </div>
</div>

  );
};

export default Wheel;
