import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Profile from './pages/Profile'; 
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Wishlist from './pages/WishList';
import OrderSuccess from './pages/OrderSuccess';
import CreateStore from './store/CreateStore';
import ProductList from './store/ProductList';
import ScrollToTop from './utils/ScrollToTop';
import StoreCollection from './store/StoreCollection';
import HomePopUp from './pages/HomePopUp';
import SpinWheelPage from './gamefy/SpinWheelPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import DeliveryPage from './components/Delivery';
import AIAssistant from './aiagent/AIAssistant';



const App = () => {
  return (
    <>
    <ScrollToTop />
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        {/* Toast Notifications */}
        <ToastContainer />

      <HomePopUp />

        {/* Navbar & Search */}
        <Navbar />
        <SearchBar />

        {/* App Routes */}
        <Routes>
         <Route path="/spin-wheel" element={<SpinWheelPage />} />          <Route path='/' element={<Home />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/product/:productId' element={<Product />} />
          
         {/* Store Pages */}
          <Route path='/store' element={<StoreCollection />} />
          <Route path='/stores/create' element={<CreateStore />} />
          <Route path='/stores/:storeId/products' element={<ProductList />} />
          


          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/place-order' element={<PlaceOrder />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/wishlist' element={<Wishlist />} />
          <Route path='/order-success' element={<OrderSuccess />} />


{/* AI AGENTS */}
          <Route path='/assistant' element={<AIAssistant/>} />



          {/* footer */}

          <Route path='/privacy' element={<PrivacyPolicy />} />
          <Route path='/delivery' element={<DeliveryPage />} />
        </Routes>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default App;
