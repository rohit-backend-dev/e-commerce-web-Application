// src/components/HomePopUp.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const imageUrls = [
  "https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&q=60&w=600",
  "https://images.unsplash.com/photo-1637069585336-827b298fe84a?auto=format&fit=crop&q=60&w=600",
  "https://images.unsplash.com/photo-1714729382668-7bc3bb261662?auto=format&fit=crop&q=60&w=600",
  "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=60&w=600",
  "https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&q=60&w=600",
  "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?auto=format&fit=crop&q=60&w=600",
  "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=60&w=600"
];

const HomePopUp = () => {
  const [visible, setVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  // Show popup only once per session
  useEffect(() => {
    const popupShown = sessionStorage.getItem("popupShown");
    if (!popupShown) {
      setTimeout(() => {
        setVisible(true);
        sessionStorage.setItem("popupShown", "true");
      }, 1500);
    }
  }, []);

  // Auto image slider
  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % imageUrls.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [visible]);

  const closePopup = () => setVisible(false);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative bg-gradient-to-b from-white via-white/95 to-gray-100 rounded-3xl shadow-2xl overflow-hidden w-[92%] max-w-lg sm:max-w-2xl border border-gray-200"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
          >
            {/* Close Button */}
            <button
              onClick={closePopup}
              className="absolute top-3 right-3 bg-black/60 text-white p-2 rounded-full hover:bg-black transition-all z-10"
            >
              <X size={18} />
            </button>

            {/* Image Section */}
            <div className="relative w-full h-64 sm:h-80 overflow-hidden">
              <motion.img
                key={currentImage}
                src={imageUrls[currentImage]}
                alt="Trendy Fashion Sale"
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

              {/* Overlay Text */}
              <div className="absolute bottom-5 left-5 text-white">
                <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                  UP TO <span className="text-pink-400">50% OFF</span>
                </h2>
                <p className="text-sm sm:text-base text-gray-200 font-light mt-1">
                  On new arrivals & top brands
                </p>
              </div>
            </div>

            {/* Text Content */}
            <div className="p-6 text-center bg-white/80 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
                Exclusive Fashion Deals 🎁
              </h2>
              <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                Don’t miss out on the latest trends. Fresh drops every week!
              </p>

              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#111827",
                  color: "#fff",
                }}
                onClick={closePopup}
                className="mt-5 bg-pink-500 text-white px-8 py-2.5 rounded-full font-semibold shadow-lg hover:bg-pink-600 transition-all"
              >
                Explore Collection
              </motion.button>

              <p className="mt-3 text-xs text-gray-500">
                *Limited time offer. Terms & conditions apply.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HomePopUp;
