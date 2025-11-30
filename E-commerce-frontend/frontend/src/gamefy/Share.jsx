import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaLink,
  FaTimes,
} from "react-icons/fa";

const Share = ({ onShared }) => {
  const [showShare, setShowShare] = useState(false);

  const handleShare = async (platform) => {
    const shareText = "🎯 I just won an amazing discount! Spin the wheel and get yours too!";
    const shareUrl = window.location.href;

    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareText
      )}&url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(
        `${shareText} ${shareUrl}`
      )}`,
      copy: shareUrl,
    };

    try {
      if (platform === "copy") {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(shareUrl);
        } else {
          const textarea = document.createElement("textarea");
          textarea.value = shareUrl;
          textarea.style.position = "fixed";
          textarea.style.opacity = "0";
          document.body.appendChild(textarea);
          textarea.focus();
          textarea.select();
          document.execCommand("copy");
          document.body.removeChild(textarea);
        }
        toast.success("🔗 Link copied to clipboard!");
      } else {
        window.open(urls[platform], "_blank", "noopener,noreferrer");
        toast.success("✅ Shared successfully!");
      }

      if (onShared) onShared();
      setShowShare(false);
    } catch (err) {
      console.error(err);
      toast.error("⚠️ Unable to share right now. Try again.");
    }
  };

  return (
    <>
      {/* Main Share Card */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 80 }}
        className="bg-gradient-to-br from-indigo-500 to-fuchsia-600 rounded-3xl shadow-2xl p-6 text-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-2xl opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-fuchsia-300 rounded-full blur-3xl opacity-10"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold mb-1 drop-shadow">Share & Earn</h3>
              <p className="text-indigo-100 text-sm">Get extra spins for sharing!</p>
            </div>
            <div className="text-4xl">🎁</div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowShare(true)}
            className="w-full bg-white text-purple-700 py-3 rounded-full font-bold shadow-md hover:shadow-xl transition-all"
          >
            Share Now & Get 3 Extra Spins
          </motion.button>
        </div>
      </motion.div>

      {/* Instagram-style Popup Modal */}
      <AnimatePresence>
        {showShare && (
          <>
            {/* Blurred overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowShare(false)}
            ></motion.div>

            {/* Bottom Drawer */}
            <motion.div
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 p-6"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 80 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">Share with</h3>
                <button
                  onClick={() => setShowShare(false)}
                  className="text-gray-500 hover:text-gray-800"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-4">
                <button
                  onClick={() => handleShare("facebook")}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="bg-blue-600 p-4 rounded-full text-white shadow-md hover:scale-105 transition-transform">
                    <FaFacebookF />
                  </div>
                  <span className="text-xs text-gray-700">Facebook</span>
                </button>

                <button
                  onClick={() => handleShare("twitter")}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="bg-sky-400 p-4 rounded-full text-white shadow-md hover:scale-105 transition-transform">
                    <FaTwitter />
                  </div>
                  <span className="text-xs text-gray-700">Twitter</span>
                </button>

                <button
                  onClick={() => handleShare("whatsapp")}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="bg-green-500 p-4 rounded-full text-white shadow-md hover:scale-105 transition-transform">
                    <FaWhatsapp />
                  </div>
                  <span className="text-xs text-gray-700">WhatsApp</span>
                </button>

                <button
                  onClick={() => handleShare("copy")}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="bg-gray-700 p-4 rounded-full text-white shadow-md hover:scale-105 transition-transform">
                    <FaLink />
                  </div>
                  <span className="text-xs text-gray-700">Copy Link</span>
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowShare(false)}
                className="w-full bg-gray-900 text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition-all"
              >
                Cancel
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Share;
