import { createContext, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;

  const navigate = useNavigate();

  // Search state
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // Cart state
  const [cartItems, setCartItems] = useState({});

  // Wishlist state
  const [wishlist, setWishlist] = useState([]);

  // Add item to cart
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select the size", { position: "top-right" });
      return;
    }

    const cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    setCartItems(cartData);
  };

  // Move wishlist item to cart
  const moveToCart = (id) => {
    const item = wishlist.find((w) => w._id === id);
    if (!item) return;

    // Add to cart (default size M)
    setCartItems((prev) => {
      const copy = { ...prev };
      copy[id] = { M: (copy[id]?.M || 0) + 1 };
      return copy;
    });

    // Remove from wishlist
    removeFromWishlist(id);

    toast.success(`${item.name} moved to cart!`);
  };

  // Remove item from wishlist
  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item._id !== id));
  };

  // Update quantity in cart
  const updateQuantity = (itemId, size, quantity) => {
    const cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId][size] = quantity;
      setCartItems(cartData);
    }
  };

  // Clear the cart
  const clearCart = () => {
    setCartItems({});
  };

  // Get total cart count
  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        totalCount += cartItems[itemId][size] || 0;
      }
    }
    return totalCount;
  };

  // Get total cart amount
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const productInfo = products.find((p) => p._id === itemId);
      if (!productInfo) continue;
      for (const size in cartItems[itemId]) {
        totalAmount += productInfo.price * cartItems[itemId][size];
      }
    }
    return totalAmount;
  };

  // Toggle wishlist item
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item._id === product._id);
      if (exists) {
        return prev.filter((item) => item._id !== product._id);
      } else {
        return [...prev, product];
      }
    });
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    updateQuantity,
    clearCart,
    getCartCount,
    getCartAmount,
    navigate,
    wishlist,
    toggleWishlist,
    moveToCart,         
    removeFromWishlist,  
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
