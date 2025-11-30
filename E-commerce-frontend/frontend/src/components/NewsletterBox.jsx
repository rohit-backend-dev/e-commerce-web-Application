import React, { useState, useEffect } from "react";

const NewsletterBox = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const subscribed = localStorage.getItem("isSubscribed");
    if (subscribed === "true") setIsSubscribed(true);
  }, []);

  const handleSubscription = (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    localStorage.setItem("isSubscribed", "true");
    setIsSubscribed(true);
    setEmail("");
    setError("");
  };

  const handleReset = () => {
    localStorage.removeItem("isSubscribed");
    setIsSubscribed(false);
    setEmail("");
  };

  return (
    <section
      className="relative text-white py-8 sm:py-10 px-4"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10 max-w-5xl mx-auto bg-white/10 backdrop-blur-md border border-white/10 rounded-xl py-4 px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        {!isSubscribed ? (
          <>
            <div className="text-left w-full sm:w-1/2">
              <h2 className="text-lg sm:text-xl font-semibold text-white">
                Subscribe & Stay Trendy 👗
              </h2>
              <p className="text-gray-200 text-xs sm:text-sm mt-1">
                Be the first to shop new collections, exclusive deals & style
                drops.
              </p>
            </div>

            <form
              onSubmit={handleSubscription}
              className="w-full sm:w-1/2 flex flex-col sm:flex-row items-center gap-2"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={`flex-1 px-4 py-2 text-sm text-gray-900 bg-white rounded-md border focus:outline-none transition-all ${
                  error
                    ? "border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-gray-200 focus:ring-1 focus:ring-gray-800"
                }`}
              />
              <button
                type="submit"
                className="px-5 py-2 text-sm font-medium bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-all duration-300 w-full sm:w-auto"
              >
                Subscribe
              </button>
            </form>
          </>
        ) : (
          <div className="w-full flex flex-col sm:flex-row items-center justify-between text-left gap-3">
            <p className="text-sm text-gray-100">
              🎉 You’re subscribed! Watch your inbox for the latest trends.
            </p>
            <button
              onClick={handleReset}
              className="px-5 py-2 text-sm font-medium bg-white text-gray-900 rounded-md hover:bg-gray-100 transition-all duration-300"
            >
              Reset
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsletterBox;
