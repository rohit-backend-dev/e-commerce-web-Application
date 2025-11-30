import React, { useState } from "react";

const AddProductForm = ({ onProductAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    sizes: [],
    colors: [],
    image: null,
  });

  const [sizeInput, setSizeInput] = useState("");
  const [colorInput, setColorInput] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setFormData((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
  };

  const addSize = () => {
    if (sizeInput && !formData.sizes.includes(sizeInput)) {
      setFormData((prev) => ({ ...prev, sizes: [...prev.sizes, sizeInput] }));
      setSizeInput("");
    }
  };

  const addColor = () => {
    if (colorInput && !formData.colors.includes(colorInput)) {
      setFormData((prev) => ({ ...prev, colors: [...prev.colors, colorInput] }));
      setColorInput("");
    }
  };

  const removeSize = (size) => {
    setFormData((prev) => ({ ...prev, sizes: prev.sizes.filter((s) => s !== size) }));
  };

  const removeColor = (color) => {
    setFormData((prev) => ({ ...prev, colors: prev.colors.filter((c) => c !== color) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    if (onProductAdd) onProductAdd(formData);
    setFormData({ name: "", description: "", price: "", category: "", quantity: "", sizes: [], colors: [], image: null });
    setSizeInput("");
    setColorInput("");
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4 text-sm">
        {/* Name & Price */}
        <div className="flex gap-3">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Name*"
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
            required
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price*"
            className="w-28 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
            required
          />
        </div>

        {/* Quantity & Category */}
       {/* Quantity & Category */}
<div className="flex flex-col sm:flex-row gap-3">
  <input
    type="number"
    name="quantity"
    value={formData.quantity}
    onChange={handleChange}
    placeholder="Quantity"
    className="flex-1 min-w-0 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm"
  />
  <input
    type="text"
    name="category"
    value={formData.category}
    onChange={handleChange}
    placeholder="Category"
    className="flex-1 min-w-0 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm"
  />
</div>


        {/* Description */}
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Product Description"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-sm"
          rows={3}
        />

        {/* Sizes */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Sizes</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={sizeInput}
              onChange={(e) => setSizeInput(e.target.value)}
              placeholder="S, M, L"
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={addSize}
              className="bg-blue-500 text-white px-4 rounded-lg hover:bg-blue-600 transition"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.sizes.map((size) => (
              <span key={size} className="bg-gray-100 px-2 py-1 rounded-full text-xs flex items-center gap-1 shadow-sm">
                {size}
                <button type="button" onClick={() => removeSize(size)} className="text-red-500 font-bold text-xs">x</button>
              </span>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Colors</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
              placeholder="Red, Blue"
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-pink-400"
            />
            <button
              type="button"
              onClick={addColor}
              className="bg-pink-500 text-white px-4 rounded-lg hover:bg-pink-600 transition"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.colors.map((color) => (
              <span key={color} className="bg-gray-100 px-2 py-1 rounded-full text-xs flex items-center gap-1 shadow-sm">
                {color}
                <button type="button" onClick={() => removeColor(color)} className="text-red-500 font-bold text-xs">x</button>
              </span>
            ))}
          </div>
        </div>

        {/* Image */}
        <div>
          <label className="flex items-center gap-3 cursor-pointer bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 text-gray-700 shadow-sm">
            Choose Product Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          {formData.image && (
            <img
              src={formData.image}
              alt="Preview"
              className="mt-3 w-28 h-28 object-cover rounded-lg shadow-md"
            />
          )}
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-semibold"
        >
          Save Product
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
