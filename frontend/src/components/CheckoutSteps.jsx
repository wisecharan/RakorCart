import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav className="flex justify-center items-center mb-8 text-sm">
      <div className="flex items-center">
        {step1 ? (
          <Link to="/login" className="font-bold text-white">Sign In</Link>
        ) : (
          <span className="text-gray-500">Sign In</span>
        )}
      </div>

      <span className="text-gray-500 mx-2">{'>'}</span>

      <div className="flex items-center">
        {step2 ? (
          <Link to="/shipping" className="font-bold text-white">Shipping</Link>
        ) : (
          <span className="text-gray-500">Shipping</span>
        )}
      </div>

      <span className="text-gray-500 mx-2">{'>'}</span>
      
      <div className="flex items-center">
        {step3 ? (
          <Link to="/payment" className="font-bold text-white">Payment</Link>
        ) : (
          <span className="text-gray-500">Payment</span>
        )}
      </div>

      <span className="text-gray-500 mx-2">{'>'}</span>

      <div className="flex items-center">
        {step4 ? (
          <Link to="/placeorder" className="font-bold text-white">Place Order</Link>
        ) : (
          <span className="text-gray-500">Place Order</span>
        )}
      </div>
    </nav>
  );
};

export default CheckoutSteps;