import React, { useState } from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const CreateStore = ({ onStoreCreate, existingData }) => {
  const [formData, setFormData] = useState(
    existingData || {
      storeName: "",
      address: "",
      description: "",
      email: "",
      phone: "",
      website: "",
      facebook: "",
      instagram: "",
      twitter: "",
      linkedin: "",
    }
  );

  const [banner, setBanner] = useState(existingData?.banner || null);
  const [logo, setLogo] = useState(existingData?.logo || null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) setBanner(URL.createObjectURL(file));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) setLogo(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newStore = { ...formData, banner, logo };
    onStoreCreate(newStore);
    alert(existingData ? "Store updated successfully!" : "Store created successfully!");
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
      {/* Banner Upload */}
      <div className="relative w-full h-48 bg-gray-200 flex justify-center items-center">
        {banner ? (
          <img
            src={banner}
            alt="Banner Preview"
            className="w-full h-48 object-cover"
          />
        ) : (
          <p className="text-gray-500">Upload Store Banner</p>
        )}
        <label className="absolute bottom-3 right-3 bg-gray-900 text-white px-3 py-1 text-sm rounded cursor-pointer hover:bg-gray-800">
          Upload
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleBannerChange}
          />
        </label>
      </div>

      {/* Form */}
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md bg-gray-100 flex items-center justify-center">
              {logo ? (
                <img
                  src={logo}
                  alt="Logo Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <p className="text-gray-400 text-sm">Logo</p>
              )}
            </div>
            <label className="block mt-2 text-sm text-gray-600 cursor-pointer">
              Upload Logo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoChange}
              />
            </label>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Store Name
            </label>
            <input
              type="text"
              name="storeName"
              value={formData.storeName}
              onChange={handleChange}
              placeholder="Rohit's Fashion Hub"
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="123 Market Street, Delhi"
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell customers about your store..."
              rows="3"
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="store@example.com"
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Website
            </label>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://yourstore.com"
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Social Links */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <FaFacebook className="text-blue-600" />
              <input
                type="text"
                name="facebook"
                value={formData.facebook}
                onChange={handleChange}
                placeholder="Facebook link"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <FaInstagram className="text-pink-500" />
              <input
                type="text"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                placeholder="Instagram link"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <FaTwitter className="text-blue-400" />
              <input
                type="text"
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
                placeholder="Twitter link"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <FaLinkedin className="text-blue-700" />
              <input
                type="text"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="LinkedIn link"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-700 outline-none"
              />
            </div>
          </div>

          <div className="md:col-span-2 flex justify-end mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
            >
              {existingData ? "Update Store" : "Create Store"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStore;
