import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate, useLocation } from 'react-router-dom';
import Chatbot from '../chatbot/ChatBot';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { SiStripe, SiCashapp, SiGooglepay, SiAmazonpay, SiJcb, SiRazorpay } from 'react-icons/si'; // payment icons

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <footer className="bg-gray-50 text-gray-800 pt-16 px-6 sm:px-12">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16">
        {/* Logo & Description */}
        <div className="flex flex-col items-center md:items-start">
          <img src={assets.logo} alt="Company Logo" className="w-32 mb-4" />
          <p className="text-gray-600 text-sm mb-4">
            Your satisfaction is our priority. Shop with confidence, anytime, anywhere.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-500 hover:text-blue-600"><FaFacebookF /></a>
            <a href="#" className="text-gray-500 hover:text-blue-400"><FaTwitter /></a>
            <a href="#" className="text-gray-500 hover:text-pink-500"><FaInstagram /></a>
            <a href="#" className="text-gray-500 hover:text-blue-700"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Company Links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-semibold text-lg mb-4 text-gray-900">COMPANY</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="/" className="hover:text-blue-600">Home</a></li>
            <li><a href="/about" className="hover:text-blue-600">About Us</a></li>
            <li><a href="/delivery" className="hover:text-blue-600">Delivery</a></li>
            <li><a href="/privacy" className="hover:text-blue-600">Privacy Policy</a></li>
            {location.pathname !== "/store" && (
              <li>
                <button
                  onClick={() => navigate('/store')}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-2"
                >
                  Store
                </button>
              </li>
            )}
          </ul>
        </div>

        {/* Get in Touch + Chatbot */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-semibold text-lg mb-4 text-gray-900">GET IN TOUCH</h3>
          <ul className="space-y-2 text-sm text-gray-600 mb-4">
            <li>Email: support@ecommerce.com</li>
            <li>Phone: +1 (123) 456-7890</li>
            <li>Address: 123 E-Commerce St, City, Country</li>
          </ul>
          <div>
            <Chatbot />
          </div>
        </div>
      </div>

      {/* Payment Methods Section */}
      <div className="border-t border-gray-200 mt-12 pt-8">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 px-4">
          <p className="mb-4 md:mb-0 font-medium text-gray-800">
            🔒 Secure Payment Systems
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 text-3xl text-gray-500">
            <SiStripe title="Stripe" className="hover:text-indigo-600 transition" />
            <SiRazorpay title="Razorpay" className="hover:text-blue-600 transition" />
            <SiGooglepay title="Net Banking" className="hover:text-green-500 transition" />
            <SiCashapp title="Cash on Delivery" className="hover:text-green-600 transition" />
            <SiAmazonpay title="JioPay" className="hover:text-yellow-600 transition" />
            <SiJcb title="Credit/Debit Card" className="hover:text-blue-500 transition" />
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 mt-6">
          &copy; 2025 E-Commerce Inc. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
