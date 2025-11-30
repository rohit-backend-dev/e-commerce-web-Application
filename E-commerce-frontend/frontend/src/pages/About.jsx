import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const About = () => {
  const coreValues = [
    { title: 'Integrity', description: 'We maintain transparency and honesty in every interaction.' },
    { title: 'Innovation', description: 'We embrace new ideas to improve your shopping experience.' },
    { title: 'Customer First', description: 'Your needs and satisfaction drive every decision we make.' },
    { title: 'Sustainability', description: 'We’re committed to eco-friendly practices.' },
  ];

  const achievements = [
    { title: '500K+', description: 'Happy Customers Served' },
    { title: '1000+', description: 'Products Available' },
    { title: '50+', description: 'Top Brands' },
    { title: '24/7', description: 'Customer Support' },
  ];

  const features = [
    { icon: '🚚', title: 'Fast Delivery', description: 'Reliable and quick delivery to your doorstep.' },
    { icon: '💳', title: 'Secure Payments', description: 'Safe and hassle-free payment options.' },
    { icon: '⭐', title: 'Top Quality', description: 'Premium products curated for our customers.' },
    { icon: '🎁', title: 'Exciting Offers', description: 'Exclusive deals and seasonal discounts.' },
    { icon: '🔄', title: 'Easy Returns', description: 'Simple and convenient return policy.' },
    { icon: '📱', title: 'Mobile Friendly', description: 'Shop anytime, anywhere from your device.' },
  ];

  return (
    <div className='about-section'>

      {/* Page Title */}
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      {/* About Us */}
      <div className='my-10 flex flex-col md:flex-row gap-16 items-center px-6 md:px-12'>
        <img
          className='w-full md:max-w-[450px] rounded-lg shadow-md transition-transform transform hover:scale-105'
          src={assets.about_img}
          alt="About Our Store"
        />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p className='text-lg leading-relaxed'>
            Welcome to <span className='font-semibold text-gray-800'>Forever</span>, your ultimate online shopping destination. 
            We provide a seamless shopping experience with a wide range of products, excellent customer support, and unmatched convenience.
          </p>
          <p className='text-lg leading-relaxed'>
            Our mission is to empower customers with the convenience of online shopping while ensuring product quality, transparency, and exceptional service. 
            Our vision is to become the most trusted e-commerce platform where every purchase brings joy and satisfaction.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className='text-xl py-6 text-center'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20 gap-8 px-6 md:px-12'>
        <div className='border px-10 md:px-16 py-8 sm:py-12 flex flex-col gap-5 rounded-lg shadow-lg hover:shadow-2xl transition-shadow'>
          <b className='text-gray-800 text-lg'>Quality Assurance</b>
          <p className='text-gray-600'>
            We carefully select products to meet the highest standards. Your satisfaction is our top priority.
          </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-12 flex flex-col gap-5 rounded-lg shadow-lg hover:shadow-2xl transition-shadow'>
          <b className='text-gray-800 text-lg'>Convenience</b>
          <p className='text-gray-600'>
            Shop from the comfort of your home with fast and reliable delivery. Our platform is designed for a smooth experience.
          </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-12 flex flex-col gap-5 rounded-lg shadow-lg hover:shadow-2xl transition-shadow'>
          <b className='text-gray-800 text-lg'>Exceptional Customer Service</b>
          <p className='text-gray-600'>
            Our dedicated team assists you at every step, from inquiries to after-sales support, ensuring trust and satisfaction.
          </p>
        </div>
      </div>

      {/* Extra Description */}
      <div className='max-w-5xl mx-auto mt-12 px-6 md:px-12 text-gray-700 space-y-6'>
        <p>
          At <span className='font-semibold text-gray-800'>Forever</span>, we aim to redefine online shopping. 
          Enjoy curated fashion collections, personalized recommendations, and lifestyle essentials that cater to your taste.
          Experience effortless navigation, secure checkout, and timely delivery with every order.
        </p>
        <p>
          From trendy apparel for men, women, and kids to stylish footwear, accessories, and home essentials, Forever brings everything to your fingertips. Explore exclusive launches, seasonal collections, and ongoing promotions to make your shopping experience truly remarkable.
        </p>

        {/* RA INSIDER / Myntra Insider Section */}
        <h3 className='text-2xl font-bold text-gray-900'>RA INSIDER</h3>
        <p>
          Every online shopping experience is precious. Hence, our cashless reward-based loyalty program, <span className='font-semibold'>RA Insider</span>, is designed to enhance your online experience. The program is applicable to every registered customer and rewards points based on your purchases.
        </p>
        <p>
          There are four levels: Insider, Select, Elite, and Icon. Each tier offers discounts, partner platform coupons, and exclusive perks.
        </p>
        <ul className='list-disc list-inside text-gray-600 space-y-2'>
          <li><b>Insider:</b> Master fashion domains with tips from celebrity stylists. Curated collections from celeb stylists.</li>
          <li><b>Elite:</b> VIP access to special sales, product launches, and early access to limited edition items.</li>
          <li><b>Icon:</b> Guest lists for special events and personalized fashion feeds.</li>
        </ul>

        {/* Myntra Studio Section */}
        <h3 className='text-2xl font-bold text-gray-900'>PERSONALISED FASHION FEED</h3>
        <p>
          Our platform curates a personalised fashion feed to help combat irrelevant content. Stay updated with latest trends, celebrity styles, and branded content through our <span className='font-semibold'>Myntra Studio</span> inspired feed.
        </p>
        <ul className='list-disc list-inside text-gray-600 space-y-2'>
          <li>Keep up with your favourite fashion icons and their #OOTD.</li>
          <li>Acquire quick fashion tips and tricks for better styling.</li>
          <li>Get updates on trending products and new launches.</li>
          <li>Follow beauty routines and expert tips from top brands.</li>
          <li>Explore celebrity confessions and lifestyle insights.</li>
        </ul>

        {/* App Section */}
        <h3 className='text-2xl font-bold text-gray-900'>FOREVER APP</h3>
        <p>
          Shop anytime, anywhere with the Forever mobile app. Access early sales, priority delivery, and exciting deals directly from your smartphone. Available on Android and iOS.
        </p>

        {/* History Section */}
        <h3 className='text-2xl font-bold text-gray-900'>HISTORY OF FOREVER</h3>
        <p>
          Forever started as a vision to provide the best online shopping experience in India. Over the years, it has grown into a trusted platform with thousands of products, multiple top brands, and millions of satisfied customers. Our journey reflects our commitment to quality, customer satisfaction, and innovation in e-commerce.
        </p>

        {/* Shopping Convenience Section */}
        <h3 className='text-2xl font-bold text-gray-900'>SHOP ONLINE WITH COMPLETE CONVENIENCE</h3>
        <p>
          Enjoy the convenience of browsing multiple brands, viewing high-resolution images, using comprehensive size charts, choosing secure payment options, and making the best buying decisions. Benefit from 14-day returns, try-and-buy for select products, and gift services for your loved ones.
        </p>
      </div>

      {/* Core Values */}
      <div className='text-xl py-6 text-center'>
        <Title text1={'OUR'} text2={'CORE VALUES'} />
      </div>
      <div className='flex flex-wrap justify-center gap-8 px-6 md:px-12 mb-20'>
        {coreValues.map((value, index) => (
          <div
            key={index}
            className='border px-6 py-4 rounded-lg shadow-md hover:shadow-lg text-center w-full sm:w-[200px] md:w-[220px] lg:w-[250px] transition-all'
          >
            <h3 className='text-lg font-semibold text-gray-800 mb-2'>{value.title}</h3>
            <p className='text-gray-600'>{value.description}</p>
          </div>
        ))}
      </div>

      {/* Features Section */}
      <div className="text-xl py-6 text-center px-4 sm:px-8">
        <Title text1={"PLATFORM"} text2={"FEATURES"} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-8 lg:px-12 mb-20">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white border rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300"
          >
            <div className="text-4xl mb-3">{feature.icon}</div>
            <h4 className="text-gray-800 font-semibold mb-1">{feature.title}</h4>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div className='text-xl py-6 text-center'>
        <Title text1={'OUR'} text2={'ACHIEVEMENTS'} />
      </div>
      <div className='flex flex-wrap justify-center gap-8 px-6 md:px-12 mb-20'>
        {achievements.map((achieve, index) => (
          <div
            key={index}
            className='bg-gray-100 border rounded-lg p-6 flex flex-col items-center text-center w-full sm:w-[150px] md:w-[180px] hover:shadow-lg transition-shadow'
          >
            <h3 className='text-2xl font-bold text-gray-800 mb-1'>{achieve.title}</h3>
            <p className='text-gray-600 text-sm'>{achieve.description}</p>
          </div>
        ))}
      </div>

      {/* Newsletter / Subscription */}
      <NewsletterBox />

    </div>
  );
};

export default About;
