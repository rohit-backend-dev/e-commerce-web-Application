import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Confetti from 'react-confetti';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const [lastOrder, setLastOrder] = useState(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    if (storedOrders.length) {
      setLastOrder(storedOrders[storedOrders.length - 1]);
    } else {
      toast.error('No recent order found!');
    }

    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-b from-green-50 to-white p-6">
      <Toaster position="top-right" reverseOrder={false} />
      {lastOrder && <Confetti width={windowSize.width} height={windowSize.height} numberOfPieces={250} />}

      <h2 className="text-4xl sm:text-5xl font-extrabold text-green-600 mb-4 animate-bounce">
        🎉 Order Placed Successfully!
      </h2>
      <p className="text-lg text-gray-700 mb-6">
        Thank you for your purchase. Your order is being processed.
      </p>

      {lastOrder && (
        <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Order Summary</h3>
          <p className="text-gray-600 text-sm mb-3">
            <span className="font-medium">Order Date:</span> {lastOrder.date}
          </p>
          <p className="text-gray-600 text-sm mb-3">
            <span className="font-medium">Payment Method:</span> {lastOrder.paymentMethod}
          </p>
          <p className="text-green-600 font-semibold text-sm mb-3">{lastOrder.status}</p>

          <div className="space-y-2">
            {lastOrder.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center border-b pb-2">
                <div className="flex items-center gap-3">
                  <img src={item.image || 'https://via.placeholder.com/80'} alt={item.name} className="w-12 h-12 rounded border object-cover" />
                  <p className="text-gray-800 font-medium">{item.name}</p>
                </div>
                <p className="text-gray-700">
                  {item.quantity} × ₹{item.price}
                </p>
              </div>
            ))}
          </div>

          <p className="text-right font-semibold mt-3 text-gray-800">
            Total: ₹{lastOrder.items.reduce((acc, item) => acc + item.price * item.quantity, 0)}
          </p>
        </div>
      )}

      <div className="mt-4 flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate('/collection')}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all duration-300 font-medium"
        >
          Continue Shopping
        </button>
        <button
          onClick={() => navigate('/orders')}
          className="bg-gray-200 text-black px-6 py-3 rounded-lg hover:bg-gray-300 transition-all duration-300 font-medium"
        >
          View My Orders
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
