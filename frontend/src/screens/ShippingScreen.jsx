import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const { userInfo } = useSelector((state) => state.auth);

  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
  const [country, setCountry] = useState(shippingAddress?.country || '');
  const [email, setEmail] = useState(userInfo?.email || shippingAddress?.email || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country, email }));
    navigate('/payment');
  };

  return (
    <div className="flex justify-center items-start mt-10">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md border border-border-light">
        <CheckoutSteps step1={!userInfo} step2 />
        <h1 className="text-3xl font-bold text-center text-text-dark">Shipping</h1>
        <form onSubmit={submitHandler} className="space-y-4">
          {!userInfo && (
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 mt-1 text-text-dark bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"/>
            </div>
          )}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required className="w-full px-3 py-2 mt-1 text-text-dark bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"/>
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
            <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} required className="w-full px-3 py-2 mt-1 text-text-dark bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"/>
          </div>
          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal Code</label>
            <input type="text" id="postalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required className="w-full px-3 py-2 mt-1 text-text-dark bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"/>
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
            <input type="text" id="country" value={country} onChange={(e) => setCountry(e.target.value)} required className="w-full px-3 py-2 mt-1 text-text-dark bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"/>
          </div>
          <button type="submit" className="w-full py-2 font-semibold text-white bg-primary rounded-md hover:bg-primary-hover transition-colors">
            Continue to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShippingScreen;