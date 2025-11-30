import React from 'react';
import { assets } from '../assets/assets';

const Features = () => {
  const featureList = [
    {
      icon: '🚚',
      title: 'Fast Delivery',
      description: 'Reliable and quick delivery to your doorstep.',
    },
    {
      icon: '💳',
      title: 'Secure Payments',
      description: 'Safe and hassle-free payment options.',
    },
    {
      icon: '⭐',
      title: 'Top Quality',
      description: 'Premium products curated for our customers.',
    },
    {
      icon: '🎁',
      title: 'Exclusive Offers',
      description: 'Get the best deals and discounts every day.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {featureList.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center"
          >
            <div className="text-5xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-500 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
