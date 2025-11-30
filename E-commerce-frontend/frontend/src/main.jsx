import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import ShopContextProvider from './context/ShopContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx'; // import AuthProvider
import { StoreProvider } from './context/StoreContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider> {/* Wrap with AuthProvider */}
      <ShopContextProvider>
         <StoreProvider>
        <App />
        </StoreProvider>
      </ShopContextProvider>
    </AuthProvider>
  </BrowserRouter>,
);
