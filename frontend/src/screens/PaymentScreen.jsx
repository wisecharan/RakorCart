import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Corrected import
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  // Redirect to shipping if address is not set
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
    <div className="flex justify-center items-center mt-10">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-md">
        <CheckoutSteps step1 step2 step3 />
        <h1 className="text-3xl font-bold text-center text-white">Payment Method</h1>
        <form onSubmit={submitHandler}>
          <div className="space-y-4">
            <label className="block text-lg font-medium text-gray-300">Select Method</label>
            <div className="flex items-center">
              <input
                type="radio"
                id="PayPal"
                name="paymentMethod"
                value="PayPal"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor="PayPal" className="ml-3 block text-sm font-medium text-white">
                PayPal or Credit Card
              </label>
            </div>
          </div>
          <button type="submit" className="w-full py-2 mt-6 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentScreen;