import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  // Redirect to shipping page if the address is missing
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
    <div className="flex justify-center items-start mt-10">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md border border-border-light">
        <CheckoutSteps step1 step2 step3 />
        <h1 className="text-3xl font-bold text-center text-text-dark">Payment Method</h1>
        <form onSubmit={submitHandler}>
          <fieldset className="mt-4">
            <legend className="block text-lg font-medium text-gray-700">Select Method</legend>
            <div className="mt-4 space-y-4">
              <div className="flex items-center p-4 border border-gray-300 rounded-md bg-gray-50">
                <input
                  type="radio"
                  id="PayPal"
                  name="paymentMethod"
                  value="PayPal"
                  checked
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                />
                <label htmlFor="PayPal" className="ml-3 block text-sm font-medium text-text-dark">
                  PayPal or Credit Card
                </label>
              </div>
              {/* You can add more payment options here in the same format */}
            </div>
          </fieldset>
          <button type="submit" className="w-full py-2 mt-6 font-semibold text-white bg-primary rounded-md hover:bg-primary-hover transition-colors">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentScreen;