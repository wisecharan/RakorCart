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
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-6 max-w-2xl">
        <CheckoutSteps step1={!userInfo} step2 />
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-semibold text-gray-900 mb-4 tracking-tight">Shipping Address</h1>
          <p className="text-gray-600 text-lg">Enter your delivery details</p>
        </div>

        <div className="bg-white rounded-xl p-8 border border-gray-200">
          <form onSubmit={submitHandler} className="space-y-6">
            {!userInfo && (
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>
            )}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <input 
                type="text" 
                id="address" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                required 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                placeholder="123 Main Street"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <input 
                  type="text" 
                  id="city" 
                  value={city} 
                  onChange={(e) => setCity(e.target.value)} 
                  required 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                  placeholder="New York"
                />
              </div>
              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                <input 
                  type="text" 
                  id="postalCode" 
                  value={postalCode} 
                  onChange={(e) => setPostalCode(e.target.value)} 
                  required 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                  placeholder="10001"
                />
              </div>
            </div>
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">Country</label>
              <input 
                type="text" 
                id="country" 
                value={country} 
                onChange={(e) => setCountry(e.target.value)} 
                required 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                placeholder="United States"
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-gray-900 text-white font-medium py-4 px-6 rounded-xl hover:bg-gray-800 transition-colors"
            >
              Continue to Payment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShippingScreen;