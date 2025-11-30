import React, { createContext, useState } from "react";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState([]);

  const addStore = (store) => {
    const newStore = { id: Date.now(), ...store };
    setStores([...stores, newStore]);
    return newStore.id;
  };

  const updateStore = (id, updatedStore) => {
    setStores(stores.map(s => s.id === id ? { ...s, ...updatedStore } : s));
  };

  const deleteStore = (id) => {
    setStores(stores.filter(s => s.id !== id));
    setProducts(products.filter(p => p.storeId !== id));
  };

  const addProduct = (product) => {
    const newProduct = { id: Date.now(), ...product };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <StoreContext.Provider
      value={{
        stores,
        products,
        addStore,
        updateStore,
        deleteStore,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
