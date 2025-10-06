import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const { userInfo } = useSelector((state) => state.auth);

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    if (userInfo) {
      navigate('/shipping');
    } else {
      navigate('/login?redirect=/shipping');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-semibold text-gray-900 mb-4 tracking-tight">Shopping Cart</h1>
          <p className="text-gray-600 text-lg">Review your items and proceed to checkout</p>
        </div>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-20 max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <p className="text-xl text-gray-600 mb-6">Your cart is empty</p>
            <Link 
              to="/products" 
              className="inline-block bg-gray-900 text-white font-medium py-3 px-8 rounded-xl hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center justify-between bg-white p-6 rounded-xl border border-gray-200">
                  <div className="flex items-center flex-grow">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-contain rounded-lg mr-6" />
                    <div className="flex-grow">
                      <Link to={`/product/${item._id}`} className="font-semibold text-gray-900 hover:text-gray-700 transition-colors text-lg">
                        {item.name}
                      </Link>
                      <p className="font-bold text-gray-900 mt-1 text-xl">${item.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => addToCartHandler(item, Math.max(1, item.qty - 1))}
                        className="px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 transition-colors"
                        disabled={item.qty <= 1}
                      >-</button>
                      <span className="px-6 py-2 border-l border-r border-gray-300 text-gray-900 font-medium">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => addToCartHandler(item, Math.min(item.countInStock, item.qty + 1))}
                        className="px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 transition-colors"
                        disabled={item.qty >= item.countInStock}
                      >+</button>
                    </div>
                    <button 
                      onClick={() => removeFromCartHandler(item._id)} 
                      className="text-gray-400 hover:text-red-500 transition-colors p-2"
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 h-fit sticky top-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                Order Summary
              </h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <p className="text-gray-600">Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items):</p>
                  <p className="font-semibold text-gray-900">${cart.itemsPrice}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Shipping:</p>
                  <p className="font-semibold text-gray-900">${cart.shippingPrice}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Tax:</p>
                  <p className="font-semibold text-gray-900">${cart.taxPrice}</p>
                </div>
              </div>
              <div className="flex justify-between font-semibold text-xl border-t border-gray-100 pt-4 mb-6">
                <p className="text-gray-900">Total:</p>
                <p className="text-gray-900">${cart.totalPrice}</p>
              </div>
              <button
                onClick={checkoutHandler}
                disabled={cartItems.length === 0}
                className="w-full bg-gray-900 text-white font-medium py-4 px-6 rounded-xl hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Proceed to Checkout
              </button>
              <p className="text-xs text-gray-500 mt-3 text-center">
                Tax included. Shipping calculated at checkout.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartScreen;