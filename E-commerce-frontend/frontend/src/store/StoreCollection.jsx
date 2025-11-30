import React, { useState, useEffect } from "react";
import CreateStore from "./CreateStore";
import AddProductForm from "./AddProductForm"; 
import { useNavigate } from "react-router-dom";

const StoreCollection = () => {
  const [stores, setStores] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedStoreIndex, setSelectedStoreIndex] = useState(null);
  const navigate = useNavigate();

  // Load stores from localStorage
  useEffect(() => {
    const savedStores = JSON.parse(localStorage.getItem("stores")) || [];
    setStores(savedStores);
  }, []);

  // Save to localStorage whenever stores update
  useEffect(() => {
    localStorage.setItem("stores", JSON.stringify(stores));
  }, [stores]);

  // Handle create or update store
  const handleStoreSave = (newStore) => {
    if (editIndex !== null) {
      const updated = [...stores];
      updated[editIndex] = { ...newStore, products: stores[editIndex].products || [] };
      setStores(updated);
      setEditIndex(null);
    } else {
      setStores([...stores, { ...newStore, products: [] }]);
    }
    setShowForm(false);
  };

  // Delete store
  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this store?")) {
      const updated = stores.filter((_, i) => i !== index);
      setStores(updated);
    }
  };

  // Edit store
  const handleEdit = (index) => {
    setEditIndex(index);
    setShowForm(true);
  };

  // Save product under selected store
  const handleProductSave = (storeIndex, newProduct) => {
    const updatedStores = [...stores];
    if (!updatedStores[storeIndex].products) {
      updatedStores[storeIndex].products = [];
    }
    updatedStores[storeIndex].products.push(newProduct);
    setStores(updatedStores);

    // Redirect to ProductList page for this store
    navigate(`/stores/${storeIndex}/products`, { state: { store: updatedStores[storeIndex] } });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Your Stores</h1>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditIndex(null);
            }}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition-all"
          >
            {showForm ? "Cancel" : "Create Store"}
          </button>
        </div>

        {/* Store Form */}
        {showForm && (
          <div className="mb-10">
            <CreateStore
              onStoreCreate={handleStoreSave}
              existingData={editIndex !== null ? stores[editIndex] : null}
            />
          </div>
        )}

        {/* Store List */}
        {stores.length === 0 ? (
          <p className="text-gray-600 text-center mt-10">
            No stores yet. Click "Create Store" to get started!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stores.map((store, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-all relative flex flex-col"
              >
                {/* Banner */}
                {store.banner ? (
                  <img
                    src={store.banner}
                    alt={store.storeName}
                    className="w-full h-40 object-cover"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-400">
                    No Banner
                  </div>
                )}

                {/* Store Info */}
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    {store.logo ? (
                      <img
                        src={store.logo}
                        alt="logo"
                        className="w-12 h-12 rounded-full object-cover border border-gray-300"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                        No Logo
                      </div>
                    )}
                    <h2 className="text-lg font-semibold text-gray-800">
                      {store.storeName}
                    </h2>
                  </div>

                  <p className="text-gray-600 text-sm mb-2 flex-1">
                    {store.description || "No description provided."}
                  </p>
                  <p className="text-sm text-gray-500">{store.address}</p>

                  {store.website && (
                    <a
                      href={store.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-sm mt-2 block hover:underline"
                    >
                      Visit Website
                    </a>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 px-4 pb-4 mt-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-blue-600 text-white px-3 py-1 rounded shadow hover:bg-blue-700 transition text-sm flex-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded shadow hover:bg-red-600 transition text-sm flex-1"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setSelectedStoreIndex(index)}
                    className="bg-green-600 text-white px-3 py-1 rounded shadow hover:bg-green-700 transition text-sm flex-1"
                  >
                    Add Product
                  </button>
                  <button
                    onClick={() => navigate(`/stores/${index}/products`, { state: { store: stores[index] } })}
                    className="bg-purple-600 text-white px-3 py-1 rounded shadow hover:bg-purple-700 transition text-sm flex-1"
                  >
                    View Products
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Product Modal using AddProductForm */}
        {selectedStoreIndex !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 relative">
              <button
                onClick={() => setSelectedStoreIndex(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold text-lg"
              >
                &times;
              </button>
              <AddProductForm
                onProductAdd={(product) =>
                  handleProductSave(selectedStoreIndex, product)
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreCollection;
