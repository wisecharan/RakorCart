import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';
import OrderSummaryCard from '../components/OrderSummaryCard';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress?.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <CheckoutSteps step1 step2 step3 />
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-semibold text-gray-900 mb-4 tracking-tight">Payment Method</h1>
            <p className="text-gray-600 text-lg">Choose how you'd like to pay</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl p-8 border border-gray-200">
                <form onSubmit={submitHandler}>
                  <fieldset className="space-y-4">
                    <div className="border border-gray-300 rounded-xl p-6 flex items-center has-[:checked]:border-gray-900 has-[:checked]:bg-gray-50 transition-colors">
                      <input
                        id="paypal"
                        type="radio"
                        name="paymentMethod"
                        value="PayPal"
                        checked={paymentMethod === 'PayPal'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="h-5 w-5 text-gray-900 focus:ring-gray-800 border-gray-300"
                      />
                      <label htmlFor="paypal" className="ml-4 block text-lg font-medium text-gray-900">
                        PayPal
                      </label>
                    </div>
                    <div className="border border-gray-300 rounded-xl p-6 flex items-center has-[:checked]:border-gray-900 has-[:checked]:bg-gray-50 transition-colors">
                      <input
                        id="creditcard"
                        type="radio"
                        name="paymentMethod"
                        value="Credit Card"
                        checked={paymentMethod === 'Credit Card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="h-5 w-5 text-gray-900 focus:ring-gray-800 border-gray-300"
                      />
                      <label htmlFor="creditcard" className="ml-4 block text-lg font-medium text-gray-900">
                        Credit Card
                      </label>
                    </div>
                  </fieldset>
                  <button 
                    type="submit" 
                    className="w-full mt-8 bg-gray-900 text-white font-medium py-4 px-6 rounded-xl hover:bg-gray-800 transition-colors"
                  >
                    Continue to Review
                  </button>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <OrderSummaryCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentScreen;