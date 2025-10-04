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
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6 text-text-dark">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <p className="text-xl text-gray-600">Your cart is empty</p>
          <Link to="/" className="text-primary hover:underline mt-4 inline-block font-semibold">
            Go Shopping
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column: Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-border-light">
                <div className="flex items-center flex-grow">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded mr-4" />
                  <div>
                    <Link to={`/product/${item._id}`} className="font-semibold text-text-dark hover:text-primary transition-colors">
                      {item.name}
                    </Link>
                    <p className="font-bold text-text-dark mt-1">${item.price}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      onClick={() => addToCartHandler(item, Math.max(1, item.qty - 1))}
                      className="px-3 py-1 font-bold text-lg"
                      disabled={item.qty <= 1}
                    >-</button>
                    <span className="px-4 py-1 border-l border-r border-gray-300">{item.qty}</span>
                    <button
                      onClick={() => addToCartHandler(item, Math.min(item.countInStock, item.qty + 1))}
                      className="px-3 py-1 font-bold text-lg"
                      disabled={item.qty >= item.countInStock}
                    >+</button>
                  </div>
                  <button onClick={() => removeFromCartHandler(item._id)} className="text-gray-500 hover:text-red-500 transition-colors">
                    <FaTrash size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Price Details */}
          <div className="bg-white p-6 rounded-lg shadow-md h-fit sticky top-24">
            <h2 className="text-2xl font-bold mb-4 border-b border-border-light pb-4">
              Price Details
            </h2>
            <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                    <p className="text-gray-600">Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items):</p>
                    <p className="font-semibold">${cart.itemsPrice}</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-gray-600">Shipping:</p>
                    <p className="font-semibold">${cart.shippingPrice}</p>
                </div>
                 <div className="flex justify-between">
                    <p className="text-gray-600">Tax:</p>
                    <p className="font-semibold">${cart.taxPrice}</p>
                </div>
            </div>
            <div className="flex justify-between font-bold text-xl border-t border-border-light pt-4">
              <p>Total:</p>
              <p>${cart.totalPrice}</p>
            </div>
            <button
              onClick={checkoutHandler}
              disabled={cartItems.length === 0}
              className="w-full mt-6 bg-primary text-white font-bold py-3 rounded-md hover:bg-primary-hover transition-colors duration-300 disabled:bg-gray-400"
            >
              Proceed To Checkout
            </button>
             <p className="text-xs text-gray-500 mt-2 text-center">Tax included. Shipping calculated at checkout.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;