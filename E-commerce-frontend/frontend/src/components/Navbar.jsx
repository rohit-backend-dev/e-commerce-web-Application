import React, { useState, useContext, useRef, useEffect } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink, useLocation } from 'react-router-dom'; // ✅ Added useLocation
import { ShopContext } from '../context/ShopContext';
import { AuthContext } from '../context/AuthContext';
import { AiOutlineHeart } from 'react-icons/ai';

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { setShowSearch, getCartCount, wishlist } = useContext(ShopContext);
  const { currentUser, logout } = useContext(AuthContext);
  const dropdownRef = useRef();

  const location = useLocation(); // ✅ Get current route

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getUserInitial = () => {
    if (!currentUser) return '';
    return currentUser.name
      ? currentUser.name.charAt(0).toUpperCase()
      : currentUser.email.charAt(0).toUpperCase();
  };

  return (
    <div className="relative z-50 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between py-5 px-4 sm:px-10 font-medium">
        {/* Logo */}
        <Link to="/">
          <img src={assets.logo} className="w-36" alt="Logo" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
          <NavLink to="/" className="flex flex-col items-center gap-1">
            <p>HOME</p>
          </NavLink>
          <NavLink to="/collection" className="flex flex-col items-center gap-1">
            <p>COLLECTION</p>
          </NavLink>
          <NavLink to="/about" className="flex flex-col items-center gap-1">
            <p>ABOUT</p>
          </NavLink>
          <NavLink to="/contact" className="flex flex-col items-center gap-1">
            <p>CONTACT</p>
          </NavLink>
        </ul>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          {/* ✅ Show search only on /collection route */}
          {location.pathname === '/collection' && (
            <img
              onClick={() => setShowSearch(true)}
              src={assets.search_icon}
              className="w-5 cursor-pointer"
              alt="Search"
            />
          )}

          {/* Wishlist */}
          <Link to="/wishlist" className="relative text-gray-700 hover:text-red-500">
            <AiOutlineHeart className="w-5 h-5 cursor-pointer" />
            <span className="absolute -top-2 -right-2 w-4 h-4 text-[8px] bg-red-500 text-white rounded-full flex items-center justify-center">
              {wishlist?.length || 0}
            </span>
          </Link>

          {/* Profile / Dropdown */}
          <div ref={dropdownRef} className="relative">
            {currentUser ? (
              <>
                <div
                  className="w-7 h-7 rounded-full bg-gray-800 text-white flex items-center justify-center cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {getUserInitial()}
                </div>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-36 flex flex-col gap-2 py-3 px-4 bg-white border border-gray-200 text-gray-700 rounded shadow-lg z-50">
                    <Link
                      to="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="hover:text-black"
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/orders"
                      onClick={() => setDropdownOpen(false)}
                      className="hover:text-black"
                    >
                      Orders
                    </Link>
                    <p
                      onClick={() => {
                        logout();
                        setDropdownOpen(false);
                      }}
                      className="cursor-pointer hover:text-black"
                    >
                      Logout
                    </p>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <img
                  className="w-5 cursor-pointer"
                  src={assets.profile_icon}
                  alt="Profile"
                />
              </Link>
            )}
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <img src={assets.cart_icon} className="w-5 min-w-5" alt="Cart" />
            <span className="absolute right-[-5px] bottom-[-5px] w-4 h-4 text-[8px] bg-black text-white rounded-full flex items-center justify-center">
              {getCartCount()}
            </span>
          </Link>

          {/* Mobile Menu Icon */}
          <img
            onClick={() => setSidebarOpen(true)}
            src={assets.menu_icon}
            className="w-5 cursor-pointer sm:hidden"
            alt="Menu"
          />
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Stylish Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 sm:hidden bg-white z-50 transform transition-transform duration-300 shadow-xl rounded-l-3xl overflow-y-auto ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col text-gray-700 p-6 gap-4">
          <button
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-2 text-gray-600 font-medium mb-4"
          >
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="Back" />
            Back
          </button>

          <NavLink onClick={() => setSidebarOpen(false)} className="py-2 font-medium hover:text-blue-600" to="/">
            HOME
          </NavLink>
          <NavLink onClick={() => setSidebarOpen(false)} className="py-2 font-medium hover:text-blue-600" to="/collection">
            COLLECTION
          </NavLink>
          <NavLink onClick={() => setSidebarOpen(false)} className="py-2 font-medium hover:text-blue-600" to="/about">
            ABOUT
          </NavLink>
          <NavLink onClick={() => setSidebarOpen(false)} className="py-2 font-medium hover:text-blue-600" to="/contact">
            CONTACT
          </NavLink>

          {/* User section in mobile sidebar */}
          {currentUser ? (
            <>
              <div
                className="w-7 h-7 rounded-full bg-gray-800 text-white flex items-center justify-center cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {getUserInitial()}
              </div>
              {dropdownOpen && (
                <div className="absolute right-6 mt-2 w-36 flex flex-col gap-2 py-3 px-4 bg-white border border-gray-200 text-gray-700 rounded shadow-lg z-50">
                  <Link to="/profile" onClick={() => setDropdownOpen(false)} className="hover:text-black">My Profile</Link>
                  <Link to="/orders" onClick={() => setDropdownOpen(false)} className="hover:text-black">Orders</Link>
                  <p onClick={() => { logout(); setDropdownOpen(false); }} className="cursor-pointer hover:text-black">Logout</p>
                </div>
              )}
            </>
          ) : (
            <Link to="/login">
              <img className="w-5 cursor-pointer" src={assets.profile_icon} alt="Profile" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
