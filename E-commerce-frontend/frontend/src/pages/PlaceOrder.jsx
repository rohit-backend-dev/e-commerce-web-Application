// src/pages/PlaceOrder.jsx
import React, { useContext, useState, useEffect } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { predefinedCoupons } from "../utils/Coupon";

const PlaceOrder = () => {
  const { cartItems, products, currency, clearCart } = useContext(ShopContext);
  const navigate = useNavigate();

  const [method, setMethod] = useState("cod");
  const [isLoading, setIsLoading] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [savedCoupons, setSavedCoupons] = useState([]);

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  // ---- Load saved coupons from Spin & Win ----
  useEffect(() => {
    try {
      const localCoupons = JSON.parse(localStorage.getItem("savedCoupons") || "[]");
      setSavedCoupons(localCoupons.filter((c) => c.code));
    } catch {
      setSavedCoupons([]);
    }
  }, []);

  // ---- Prepare cart items ----
  const orderItems = [];
  for (const pid in cartItems) {
    for (const size in cartItems[pid]) {
      if (cartItems[pid][size] > 0) {
        const product = products.find((p) => p._id === pid);
        if (product) {
          orderItems.push({
            name: product.name,
            price: product.price,
            quantity: cartItems[pid][size],
            size,
            image: product.image || product.imageUrl || "",
          });
        }
      }
    }
  }

  // ---- Totals ----
  const subtotal = orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const totalAfterDiscount = Math.max(subtotal - discount, 0);

  // ---- Handle Apply / Remove Coupon ----
 const handleCouponAction = () => {
  if (appliedCoupon) {
    // Remove coupon
    setAppliedCoupon(null);
    setDiscount(0);
    setCoupon("");
    toast("Coupon removed", { icon: "❌" });
    return;
  }

  const input = coupon.trim().toUpperCase();
  if (!input) return toast.error("Please enter a coupon code!");

  // Merge predefined and saved coupons
  const combinedCoupons = { ...predefinedCoupons };

  // Saved coupons from spin & win (e.g., SAVE10, SAVE20)
  savedCoupons.forEach((c) => {
    if (c.code) {
      const value = parseInt(c.code.replace(/\D/g, "")) || 10; // Extract number (SAVE10 → 10)
      combinedCoupons[c.code.toUpperCase()] = { type: "flat", value };
    }
  });

  const valid = combinedCoupons[input];
  if (valid) {
    let discountValue = 0;

    if (valid.type === "percent") {
      // Apply percentage discount (max ₹200)
      discountValue = Math.min((subtotal * valid.value) / 100, 200);
    } else if (valid.type === "flat") {
      // Flat discount (₹10, ₹20, etc.)
      discountValue = valid.value;
    }

    // Ensure it never exceeds subtotal
    discountValue = Math.min(discountValue, subtotal);

    setDiscount(discountValue);
    setAppliedCoupon(input);
    toast.success(`Coupon ${input} applied! You saved ${currency}${discountValue.toFixed(2)} 🎉`);
  } else {
    toast.error("Invalid coupon code!");
    setDiscount(0);
    setAppliedCoupon(null);
  }
};

  // ---- Handle form input ----
  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  // ---- Place Order ----
  const handlePlaceOrder = async () => {
    if (!orderItems.length) return toast.error("Your cart is empty!");

    for (const key in shippingInfo) {
      if (!shippingInfo[key]) {
        toast.error("Please fill in all delivery details!");
        return;
      }
    }

    if (!/\S+@\S+\.\S+/.test(shippingInfo.email)) {
      toast.error("Enter a valid email address!");
      return;
    }
    if (!/^\d{10}$/.test(shippingInfo.phone)) {
      toast.error("Enter a valid 10-digit phone number!");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to place an order!");
      navigate("/login");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/orders/place-order`,
        {
          paymentMethod: method,
          shippingInfo,
          items: orderItems,
          discount,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      const data = response.data;
      const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
      storedOrders.push({
        id: data.id || Date.now(),
        items: orderItems,
        total: totalAfterDiscount,
        date: new Date().toLocaleString(),
        paymentMethod: method,
        status: "Processing",
      });
      localStorage.setItem("orders", JSON.stringify(storedOrders));

      clearCart();
      toast.success("Order placed successfully!");

      if (method === "stripe" && data.sessionUrl) {
        window.location.href = data.sessionUrl;
      } else {
        navigate("/order-success");
      }
    } catch (error) {
      console.error("Order placement error:", error);
      if (error.response?.status === 403) {
        toast.error("Session expired — please log in again!");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        toast.error("Something went wrong while placing the order!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ---- UI ----
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start gap-10 sm:pt-14 border-t bg-gray-50 px-6 sm:px-10 py-8 rounded-lg shadow-sm">
      <Toaster position="top-right" />

      {/* LEFT: SHIPPING INFO */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px] bg-white p-6 rounded-2xl shadow-md border">
        <div className="text-xl sm:text-2xl mb-2">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>

        <div className="flex gap-3">
          <input name="firstName" onChange={handleChange} value={shippingInfo.firstName} placeholder="First name" className="border rounded-lg py-2 px-3.5 w-full focus:ring-2 focus:ring-green-400" />
          <input name="lastName" onChange={handleChange} value={shippingInfo.lastName} placeholder="Last name" className="border rounded-lg py-2 px-3.5 w-full focus:ring-2 focus:ring-green-400" />
        </div>

        <input name="email" onChange={handleChange} value={shippingInfo.email} placeholder="Email Address" className="border rounded-lg py-2 px-3.5 w-full focus:ring-2 focus:ring-green-400" />
        <input name="phone" onChange={handleChange} value={shippingInfo.phone} placeholder="Phone Number" className="border rounded-lg py-2 px-3.5 w-full focus:ring-2 focus:ring-green-400" />
        <input name="address" onChange={handleChange} value={shippingInfo.address} placeholder="Shipping Address" className="border rounded-lg py-2 px-3.5 w-full focus:ring-2 focus:ring-green-400" />
        <input name="city" onChange={handleChange} value={shippingInfo.city} placeholder="City" className="border rounded-lg py-2 px-3.5 w-full focus:ring-2 focus:ring-green-400" />

        <div className="flex gap-3">
          <input name="state" onChange={handleChange} value={shippingInfo.state} placeholder="State" className="border rounded-lg py-2 px-3.5 w-full focus:ring-2 focus:ring-green-400" />
          <input name="zip" onChange={handleChange} value={shippingInfo.zip} placeholder="Zip Code" className="border rounded-lg py-2 px-3.5 w-full focus:ring-2 focus:ring-green-400" />
        </div>
      </div>

      {/* RIGHT: SUMMARY & PAYMENT */}
      <div className="w-full lg:w-[400px] bg-white p-6 rounded-2xl shadow-md border self-start">
        <CartTotal />

        {/* Coupon Section */}
        <div className="mt-6">
          <Title text1="COUPON" text2="CODE" />
          <div className="flex gap-3 mt-3">
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Enter coupon code"
              className="border rounded-lg py-2 px-3.5 w-full focus:ring-2 focus:ring-green-400"
              disabled={!!appliedCoupon}
            />
            <button
              onClick={handleCouponAction}
              className={`${
                appliedCoupon ? "bg-red-500 hover:bg-red-600" : "bg-green-600 hover:bg-green-700"
              } text-white px-4 py-2 rounded-lg transition-all`}
            >
              {appliedCoupon ? "Remove" : "Apply"}
            </button>
          </div>

          {appliedCoupon && (
            <p className="text-green-600 mt-2 text-sm">
              Coupon <b>{appliedCoupon}</b> applied! You saved {currency}
              {discount.toFixed(2)}
            </p>
          )}
        </div>

        {/* Totals */}
        <div className="mt-5 border-t pt-4 text-gray-800 font-medium">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>{currency}{subtotal.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount:</span>
              <span>-{currency}{discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-lg font-bold mt-2">
            <span>Total:</span>
            <span>{currency}{totalAfterDiscount.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Method */}
        <div className="mt-8">
          <Title text1="PAYMENT" text2="METHOD" />
          <div className="flex flex-col sm:flex-row gap-4 mt-3">
            <div
              onClick={() => setMethod("stripe")}
              className={`flex items-center gap-3 border p-3 px-4 rounded-lg cursor-pointer transition-all ${
                method === "stripe" ? "border-green-500 bg-green-50" : "hover:border-gray-400"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full border ${
                  method === "stripe" ? "bg-green-400" : "bg-white"
                }`}
              />
              <img src={assets.stripe_logo} alt="Stripe" className="h-5" />
              <p className="font-medium text-sm text-gray-700">Stripe</p>
            </div>

            <div
              onClick={() => setMethod("cod")}
              className={`flex items-center gap-3 border p-3 px-4 rounded-lg cursor-pointer transition-all ${
                method === "cod" ? "border-green-500 bg-green-50" : "hover:border-gray-400"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full border ${
                  method === "cod" ? "bg-green-400" : "bg-white"
                }`}
              />
              <p className="text-sm font-medium text-gray-700">Cash on Delivery</p>
            </div>
          </div>
        </div>

        <div className="w-full text-end mt-10">
          <button
            onClick={handlePlaceOrder}
            disabled={isLoading}
            className={`${
              isLoading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
            } bg-black text-white px-14 py-3 text-sm rounded-lg transition-all duration-300`}
          >
            {isLoading ? "Placing Order..." : "PLACE ORDER"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
