import React, { useState, useEffect } from "react";
import CreateStore from "./CreateStore";

const ManageStores = () => {
  const [stores, setStores] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Load stores from localStorage
  useEffect(() => {
    const savedStores = JSON.parse(localStorage.getItem("stores")) || [];
    setStores(savedStores);
  }, []);

  // Save stores whenever they change
  useEffect(() => {
    localStorage.setItem("stores", JSON.stringify(stores));
  }, [stores]);

  // Handle new store creation
  const handleCreateStore = (newStore) => {
    if (editingIndex !== null) {
      const updatedStores = [...stores];
      updatedStores[editingIndex] = newStore;
      setStores(updatedStores);
      setEditingIndex(null);
    } else {
      setStores([...stores, newStore]);
    }
    setShowForm(false);
  };

  // Handle edit
  const handleEdit = (index) => {
    setEditingIndex(index);
    setShowForm(true);
  };

  // Handle delete
  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this store?")) {
      const updatedStores = stores.filter((_, i) => i !== index);
      setStores(updatedStores);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Manage Stores</h1>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingIndex(null);
            }}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition-all"
          >
            {showForm ? "Cancel" : "Add New Store"}
          </button>
        </div>

        {/* Show Create/Edit Form */}
        {showForm && (
          <div className="mb-10">
            <CreateStore
              onStoreCreate={handleCreateStore}
              existingData={editingIndex !== null ? stores[editingIndex] : null}
            />
          </div>
        )}

        {/* Store Management Table */}
        {stores.length === 0 ? (
          <p className="text-gray-600 text-center mt-10">
            No stores found. Click "Add New Store" to create one.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left">Logo</th>
                  <th className="py-3 px-4 text-left">Store Name</th>
                  <th className="py-3 px-4 text-left">Address</th>
                  <th className="py-3 px-4 text-left">Website</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {stores.map((store, index) => (
                  <tr
                    key={index}
                    className="border-t hover:bg-gray-50 transition-all"
                  >
                    <td className="py-3 px-4">
                      {store.logo ? (
                        <img
                          src={store.logo}
                          alt="Logo"
                          className="w-10 h-10 rounded-full object-cover border"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-200 flex items-center justify-center text-gray-400 rounded-full">
                          N/A
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 font-medium">{store.storeName}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {store.address}
                    </td>
                    <td className="py-3 px-4 text-blue-600">
                      {store.website ? (
                        <a
                          href={store.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          Visit
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="py-3 px-4 flex gap-2">
                      <button
                        onClick={() => handleEdit(index)}
                        className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageStores;
