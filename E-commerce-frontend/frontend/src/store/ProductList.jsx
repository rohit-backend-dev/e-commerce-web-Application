import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProductList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const store = location.state?.store;

  const [products, setProducts] = useState(store?.products || []);

  // Sync products from localStorage on mount
  useEffect(() => {
    const savedStores = JSON.parse(localStorage.getItem("stores")) || [];
    const currentStore = savedStores.find(s => s.id === store.id);
    if (currentStore && currentStore.products) {
      setProducts(currentStore.products);
    }
  }, [store.id]);

  // Save products to localStorage and notify Collection
  const saveProducts = (updatedProducts) => {
    setProducts(updatedProducts);
    const savedStores = JSON.parse(localStorage.getItem("stores")) || [];
    const storeIndex = savedStores.findIndex(s => s.id === store.id);
    if (storeIndex !== -1) {
      savedStores[storeIndex] = { ...savedStores[storeIndex], products: updatedProducts };
      localStorage.setItem("stores", JSON.stringify(savedStores));
    }
    // Dispatch storage event for other tabs/components to listen
    window.dispatchEvent(new Event("storage"));
  };

  // Delete product
  const deleteProduct = (index) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const updated = [...products];
      updated.splice(index, 1);
      saveProducts(updated);
    }
  };

  // Toggle availability
  const toggleAvailability = (index) => {
    const updated = [...products];
    updated[index].available = !updated[index].available;
    saveProducts(updated);
  };

  // Edit product
  const editProduct = (index) => {
    const newName = prompt("Enter new product name", products[index].name);
    if (!newName) return;
    const updated = [...products];
    updated[index] = { ...updated[index], name: newName };
    saveProducts(updated);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 hover:underline mb-4"
      >
        &larr; Back
      </button>
      <h1 className="text-2xl font-bold mb-4">{store.storeName}'s Products</h1>
      {products.length === 0 ? (
        <p>No products posted yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((prod, i) => (
            <div
              key={prod.id || i}
              className="bg-white shadow rounded p-3 flex flex-col gap-2"
            >
              {prod.image && (
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-32 object-cover rounded"
                />
              )}
              <h3 className="font-semibold">{prod.name}</h3>
              <p className="text-sm text-gray-600">{prod.description}</p>
              <p className="text-sm font-medium">₹{prod.price}</p>
              <p className="text-xs text-gray-500">
                Qty: {prod.quantity || 0}
              </p>
              <p className="text-xs text-gray-500">
                Status: {prod.available === false ? "Unavailable" : "Available"}
              </p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => editProduct(i)}
                  className="text-blue-600 text-xs hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProduct(i)}
                  className="text-red-500 text-xs hover:underline"
                >
                  Delete
                </button>
                <button
                  onClick={() => toggleAvailability(i)}
                  className="text-green-600 text-xs hover:underline"
                >
                  {prod.available === false ? "Mark Available" : "Mark Unavailable"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
