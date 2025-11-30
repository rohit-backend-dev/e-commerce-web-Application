import React, { useEffect, useState } from 'react';
import Title from '../components/Title';

const statusColors = {
  Processing: 'bg-yellow-400',
  'Ready to Ship': 'bg-blue-400',
  Shipped: 'bg-orange-500',
  Delivered: 'bg-green-500',
  Cancelled: 'bg-red-500',
};

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(storedOrders.reverse()); // latest first
  }, []);

  if (orders.length === 0) {
    return (
      <div className='border-t pt-16 px-6'>
        <div className='text-2xl'>
          <Title text1={'MY'} text2={'ORDERS'} />
        </div>
        <p className="text-gray-500 mt-4">You have no orders yet.</p>
      </div>
    );
  }

  return (
    <div className='border-t pt-16 px-6'>
      <div className='text-2xl mb-6'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      {orders.map((order, index) => (
        <div
          key={index}
          className='mb-6 border rounded-lg bg-white shadow-sm p-4'
        >
          {/* Order Header */}
          <div className='flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-3 mb-3'>
            <div className='text-sm md:text-base text-gray-600'>
              <p>Order ID: <span className='font-medium'>{order._id || 'N/A'}</span></p>
              <p>Date: <span className='font-medium'>{order.date}</span></p>
              <p>Payment: <span className='font-medium'>{order.paymentMethod}</span></p>
            </div>
            <div className='flex items-center gap-3 mt-2 md:mt-0'>
              <span className={`w-3 h-3 rounded-full ${statusColors[order.status] || 'bg-gray-400'}`}></span>
              <p className='text-sm md:text-base font-medium'>{order.status}</p>
            </div>
          </div>

          {/* Products */}
          <div className='flex flex-col gap-4'>
            {order.items.map((item, idx) => (
              <div key={idx} className='flex gap-4 items-center'>
                <img src={item.image} alt={item.name} className='w-16 sm:w-20 rounded-lg' />
                <div className='flex-1'>
                  <p className='font-medium text-sm sm:text-base'>{item.name}</p>
                  <div className='flex gap-3 mt-1 text-gray-700 text-sm sm:text-base'>
                    <p>Price: ${item.price}</p>
                    <p>Qty: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                </div>
                <p className='font-medium text-sm sm:text-base'>
                  ${item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          {/* Order Footer */}
          <div className='mt-4 flex justify-between items-center'>
            <p className='font-medium text-gray-700'>
              Total: ${order.items.reduce((acc, i) => acc + i.price * i.quantity, 0)}
            </p>
            <button className='bg-black text-white px-4 py-2 rounded hover:bg-gray-800 text-sm sm:text-base'>
              TRACK ORDER
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
