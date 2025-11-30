import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import Productitem from '../components/Productitem';
import Title from '../components/Title';

const Profile = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const { wishlist } = useContext(ShopContext);
  const navigate = useNavigate();

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <p className="text-gray-600 text-center">
          You are not logged in. Please{' '}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate('/login')}
          >
            login
          </span>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-10 p-4 sm:p-6 space-y-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 border-b pb-2">My Account</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Sidebar */}
        <div className="lg:w-1/4 space-y-6">
          {/* Profile Card */}
          <div className="bg-white p-5 rounded-lg shadow flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gray-800 text-white flex items-center justify-center text-3xl">
              {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : currentUser.email.charAt(0).toUpperCase()}
            </div>
            <div className="text-center">
              <p className="font-semibold text-lg">{currentUser.name || 'N/A'}</p>
              <p className="text-gray-500 text-sm">{currentUser.email}</p>
            </div>
            <button
              onClick={() => { logout(); navigate('/'); }}
              className="mt-3 w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>

          {/* Navigation Card */}
          <div className="bg-white p-5 rounded-lg shadow space-y-3">
            <p className="font-semibold text-gray-700">Account Options</p>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li className="cursor-pointer hover:text-black" onClick={() => navigate('/profile/edit')}>Personal Info</li>
              <li className="cursor-pointer hover:text-black" onClick={() => navigate('/orders')}>My Orders</li>
              <li className="cursor-pointer hover:text-black" onClick={() => navigate('/addresses')}>Address Book</li>
              <li className="cursor-pointer hover:text-black" onClick={() => navigate('/wishlist')}>
                Wishlist {wishlist.length > 0 && <span className="ml-1 text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">{wishlist.length}</span>}
              </li>
            </ul>
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:w-3/4 space-y-6">
          {/* Personal Info Card */}
          <div className="bg-white p-6 rounded-lg shadow space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Personal Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 text-sm">Full Name</p>
                <p className="font-medium">{currentUser.name || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Email</p>
                <p className="font-medium">{currentUser.email}</p>
              </div>
            </div>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              onClick={() => navigate('/profile/edit')}
            >
              Edit Profile
            </button>
          </div>

          {/* Orders Card */}
          <div className="bg-white p-6 rounded-lg shadow space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Recent Orders</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Sample orders - you can map real orders here */}
              <div className="p-4 bg-gray-50 rounded border flex flex-col justify-between">
                <p className="text-gray-600 text-sm">Order #12345</p>
                <p className="font-medium text-gray-800 mt-2">Processing</p>
                <button
                  className="mt-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                  onClick={() => navigate('/orders')}
                >
                  View Details
                </button>
              </div>
              <div className="p-4 bg-gray-50 rounded border flex flex-col justify-between">
                <p className="text-gray-600 text-sm">Order #12346</p>
                <p className="font-medium text-gray-800 mt-2">Delivered</p>
                <button
                  className="mt-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                  onClick={() => navigate('/orders')}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>

          {/* Wishlist Preview */}
          <div className="bg-white p-6 rounded-lg shadow space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Wishlist Preview</h2>
            {wishlist.length === 0 ? (
              <p className="text-gray-500 text-sm">You have no items in your wishlist.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {wishlist.slice(0, 4).map((item) => (
                  <Productitem
                    key={item._id}
                    id={item._id}
                    image={item.image}
                    name={item.name}
                    price={item.price}
                  />
                ))}
              </div>
            )}
            {wishlist.length > 4 && (
              <button
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                onClick={() => navigate('/wishlist')}
              >
                View All Wishlist
              </button>
            )}
          </div>

          {/* Addresses Card */}
          <div className="bg-white p-6 rounded-lg shadow space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Saved Addresses</h2>
            <div className="space-y-2">
              {/* Sample addresses - replace with real data */}
              <div className="p-4 bg-gray-50 rounded border flex justify-between items-center">
                <p className="text-gray-600 text-sm">123, MG Road, Bangalore, Karnataka</p>
                <button
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
                  onClick={() => navigate('/addresses')}
                >
                  Edit
                </button>
              </div>
              <div className="p-4 bg-gray-50 rounded border flex justify-between items-center">
                <p className="text-gray-600 text-sm">456, Brigade Road, Bangalore, Karnataka</p>
                <button
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
                  onClick={() => navigate('/addresses')}
                >
                  Edit
                </button>
              </div>
            </div>
            <button
              className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
              onClick={() => navigate('/addresses')}
            >
              Add New Address
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
