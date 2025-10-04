import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav className="flex justify-center items-center mb-8 text-sm">
      <div className="flex items-center">
        {step1 ? (
          <Link to="/login" className="font-bold text-primary">Sign In</Link>
        ) : (
          <span className="text-gray-400 cursor-not-allowed">Sign In</span>
        )}
      </div>

      <span className="text-gray-400 mx-2">{'>'}</span>

      <div className="flex items-center">
        {step2 ? (
          <Link to="/shipping" className="font-bold text-primary">Shipping</Link>
        ) : (
          <span className="text-gray-400 cursor-not-allowed">Shipping</span>
        )}
      </div>

      <span className="text-gray-400 mx-2">{'>'}</span>
      
      <div className="flex items-center">
        {step3 ? (
          <Link to="/payment" className="font-bold text-primary">Payment</Link>
        ) : (
          <span className="text-gray-400 cursor-not-allowed">Payment</span>
        )}
      </div>

      <span className="text-gray-400 mx-2">{'>'}</span>

      <div className="flex items-center">
        {step4 ? (
          <Link to="/placeorder" className="font-bold text-primary">Place Order</Link>
        ) : (
          <span className="text-gray-400 cursor-not-allowed">Place Order</span>
        )}
      </div>
    </nav>
  );
};

export default CheckoutSteps;