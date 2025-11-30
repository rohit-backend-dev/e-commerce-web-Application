import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";

const defaultImage = "https://via.placeholder.com/300x300?text=No+Image";

const Productitem = ({ id, image, name, price }) => {
  const { currency, wishlist, toggleWishlist } = useContext(ShopContext);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isGlowing, setIsGlowing] = useState(false);

  useEffect(() => {
    setIsWishlisted(wishlist.some((item) => item._id === id));
  }, [wishlist, id]);

  const handleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist({ _id: id, name, price, image });
    setIsAnimating(true);
    setIsGlowing(true);

    setTimeout(() => setIsAnimating(false), 400);
    setTimeout(() => setIsGlowing(false), 600);
  };

  return (
    <div className="relative group">
      {/* Product Card */}
      <Link to={`/product/${id}`} className="block">
        <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col items-center">
          <div className="relative w-full flex justify-center">
            <img
              className="w-full h-56 object-contain transition-transform duration-300 ease-in-out group-hover:scale-105"
              src={image && image[0] ? image[0] : defaultImage}
              alt={name}
            />
          </div>

          <div className="w-full mt-3">
            <p className="text-sm font-medium text-gray-800 truncate">{name}</p>
            <p className="text-sm font-semibold text-gray-900">
              {currency}
              {price}
            </p>
          </div>
        </div>
      </Link>

      {/* Heart Icon */}
      <motion.div
        onClick={handleWishlist}
        className={`absolute top-3 right-3 cursor-pointer text-2xl ${
          isWishlisted ? "text-red-500" : "text-gray-500"
        }`}
        animate={
          isAnimating
            ? { scale: [1, 1.4, 1.2, 1] }
            : { scale: 1, rotate: 0 }
        }
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isWishlisted ? (
            <motion.span
              key="filled"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className={`relative ${
                isGlowing
                  ? "after:content-[''] after:absolute after:-inset-2 after:rounded-full after:blur-md after:bg-red-400/60 after:animate-ping"
                  : ""
              }`}
            >
              <AiFillHeart />
            </motion.span>
          ) : (
            <motion.span
              key="outline"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <AiOutlineHeart />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Productitem;
