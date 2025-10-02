import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

// Styles
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

// Components & Screens
import App from './App.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProductScreen from './screens/ProductScreen.jsx';
import CartScreen from './screens/CartScreen.jsx';
import ShippingScreen from './screens/ShippingScreen.jsx';
import PaymentScreen from './screens/PaymentScreen.jsx';
import PlaceOrderScreen from './screens/PlaceOrderScreen.jsx';
import OrderScreen from './screens/OrderScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import WishlistScreen from './screens/WishlistScreen.jsx';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen.jsx';
import ResetPasswordScreen from './screens/ResetPasswordScreen.jsx';
// Admin Screens
import DashboardScreen from './screens/admin/DashboardScreen.jsx';
import ProductListScreen from './screens/admin/ProductListScreen.jsx';
import OrderListScreen from './screens/admin/OrderListScreen.jsx';
import UserListScreen from './screens/admin/UserListScreen.jsx';
import ProductEditScreen from './screens/admin/ProductEditScreen.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Public Routes */}
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/search/:keyword" element={<HomeScreen />} />
      <Route path="/page/:pageNumber" element={<HomeScreen />} />
      <Route path="/search/:keyword/page/:pageNumber" element={<HomeScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/forgotpassword" element={<ForgotPasswordScreen />} />
      <Route path="/resetpassword/:resettoken" element={<ResetPasswordScreen />} />

      {/* Private User Routes */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/wishlist" element={<WishlistScreen />} />
      </Route>

      {/* Admin Only Routes */}
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/dashboard" element={<DashboardScreen />} />
        <Route path="/admin/productlist" element={<ProductListScreen />} />
        <Route path="/admin/orderlist" element={<OrderListScreen />} />
        <Route path="/admin/userlist" element={<UserListScreen />} />
        <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
      </Route>
    </Route>
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