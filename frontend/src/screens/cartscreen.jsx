import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import { addToCart, removeFromCart } from '../slices/cartSlice';


const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // 1. Get the user's login status from the Redux state
  const { userInfo } = useSelector((state) => state.auth);

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  // 2. Update the checkout handler to check if the user is logged in
  const checkoutHandler = () => {
    if (userInfo) {
      navigate('/shipping');
    } else {
      navigate('/login?redirect=/shipping');
    }
  };

  return (
    <div className="container mx-auto mt-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center p-8 bg-gray-800 rounded-lg">
          <p className="text-xl">Your cart is empty</p>
          <Link to="/" className="text-blue-400 hover:underline mt-4 inline-block">Go Back</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column: Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center justify-between bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4"/>
                  <Link to={`/product/${item._id}`} className="font-semibold hover:underline">{item.name}</Link>
                </div>
                <div className="font-bold">${item.price}</div>
                <div>
                  <select
                    value={item.qty}
                    onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                    className="bg-gray-700 p-2 rounded"
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>{x + 1}</option>
                    ))}
                  </select>
                </div>
                <button onClick={() => removeFromCartHandler(item._id)} className="text-red-500 hover:text-red-400">
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          {/* Right Column: Subtotal & Checkout */}
          <div className="bg-gray-800 p-6 rounded-lg h-fit">
            <h2 className="text-2xl font-bold mb-4">
              Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
            </h2>
            <p className="text-2xl font-bold mb-6">${cart.itemsPrice}</p>
            <button
              onClick={checkoutHandler}
              disabled={cartItems.length === 0}
              className="w-full bg-blue-600 font-bold py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-500"
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;