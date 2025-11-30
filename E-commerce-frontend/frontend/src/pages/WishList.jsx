import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Productitem from '../components/Productitem';
import Title from '../components/Title';

const Wishlist = () => {
  const { wishlist, moveToCart, removeFromWishlist } = useContext(ShopContext);

  if (!wishlist || wishlist.length === 0) {
    return <p className="text-center my-10 text-gray-600">Your wishlist is empty.</p>;
  }

  return (
    <div className="my-10 px-4">
      {/* Title */}
      <div className="text-center py-8 text-3xl">
        <Title text1="MY" text2="WISHLIST" />
      </div>

      {/* Wishlist Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {wishlist.map((item) => (
          <div key={item._id} className="relative flex flex-col items-center border rounded-lg p-3 shadow hover:shadow-md transition-shadow">
            <Productitem
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />

            {/* Move to Cart Button */}
            <button
              onClick={() => moveToCart(item._id)}
              className="mt-2 w-full bg-blue-600 text-white text-sm py-1 rounded hover:bg-blue-700 transition-colors"
            >
              Move to Cart
            </button>

            {/* Optional: Remove from Wishlist */}
            <button
              onClick={() => removeFromWishlist(item._id)}
              className="mt-1 w-full bg-red-500 text-white text-sm py-1 rounded hover:bg-red-600 transition-colors"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
