import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import store from './store';

import 'react-toastify/dist/ReactToastify.css';
import './index.css';

import App from './App.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import AdminLayout from './components/AdminLayout.jsx';


// Screens
import HomeScreen from './screens/HomeScreen.jsx';
import ProductScreen from './screens/ProductScreen.jsx';
import CartScreen from './screens/CartScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ShippingScreen from './screens/ShippingScreen.jsx';
import PaymentScreen from './screens/PaymentScreen.jsx';
import PlaceOrderScreen from './screens/PlaceOrderScreen.jsx';
import OrderScreen from './screens/OrderScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import WishlistScreen from './screens/WishlistScreen.jsx';
import ShopAllScreen from './screens/ShopAllScreen.jsx';
import FAQScreen from './screens/FAQScreen.jsx';
import ContactScreen from './screens/ContactScreen.jsx';
import ProductAddScreen from './screens/admin/ProductAddScreen.jsx';

// Admin Screens
import DashboardScreen from './screens/admin/DashboardScreen.jsx';
import ProductListScreen from './screens/admin/ProductListScreen.jsx';
import OrderListScreen from './screens/admin/OrderListScreen.jsx';
import UserListScreen from './screens/admin/UserListScreen.jsx';
import ProductEditScreen from './screens/admin/ProductEditScreen.jsx';
import AdminCategoriesScreen from './screens/admin/AdminCategoriesScreen.jsx';
import AdminSalesScreen from './screens/admin/AdminSalesScreen.jsx';
import AdminNotificationsScreen from './screens/admin/AdminNotificationsScreen.jsx';
import AdminSettingsScreen from './screens/admin/AdminSettingsScreen.jsx';
import AdminOrderScreen from './screens/admin/AdminOrderScreen.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* User Facing Routes */}
      <Route path="/" element={<App />}>
        <Route index={true} path="/" element={<HomeScreen />} />
        <Route path="/page/:pageNumber" element={<HomeScreen />} />
        <Route path="/search/:keyword" element={<HomeScreen />} />
        <Route path="/search/:keyword/page/:pageNumber" element={<HomeScreen />} />
        <Route path="/product/:id" element={<ProductScreen />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/products" element={<ShopAllScreen />} />
        <Route path="/products/page/:pageNumber" element={<ShopAllScreen />} />
        <Route path="/faq" element={<FAQScreen />} />
        <Route path="/contact" element={<ContactScreen />} />

        <Route path="" element={<PrivateRoute />}>
          <Route path="/shipping" element={<ShippingScreen />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/placeorder" element={<PlaceOrderScreen />} />
          <Route path="/order/:id" element={<OrderScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/wishlist" element={<WishlistScreen />} />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="dashboard" element={<DashboardScreen />} />
          <Route path="productlist" element={<ProductListScreen />} />
          <Route path="product/:id/edit" element={<ProductEditScreen />} />
          <Route path="categories" element={<AdminCategoriesScreen />} />
          <Route path="orderlist" element={<OrderListScreen />} />
          <Route path="userlist" element={<UserListScreen />} />
          <Route path="sales" element={<AdminSalesScreen />} />
          <Route path="notifications" element={<AdminNotificationsScreen />} />
          <Route path="settings" element={<AdminSettingsScreen />} />
          <Route path="order/:id" element={<AdminOrderScreen />} />
          <Route path="product/add" element={<ProductAddScreen />} /> 
        </Route>
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PayPalScriptProvider deferLoading={true}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </PayPalScriptProvider>
  </Provider>
);