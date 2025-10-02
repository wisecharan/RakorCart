import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import { removeFromWishlist } from '../slices/wishlistSlice';

const WishlistScreen = () => {
  const dispatch = useDispatch();
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const removeFromWishlistHandler = (id) => {
    dispatch(removeFromWishlist(id));
  };

  return (
    <div className="container mx-auto mt-8 text-white">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <div className="text-center p-8 bg-gray-800 rounded-lg">
          <p className="text-xl">Your wishlist is empty</p>
          <Link to="/" className="text-blue-400 hover:underline mt-4 inline-block">Go Shopping</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {wishlistItems.map((item) => (
            <div key={item._id} className="flex items-center justify-between bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4"/>
                <Link to={`/product/${item._id}`} className="font-semibold hover:underline">{item.name}</Link>
              </div>
              <div className="font-bold">${item.price}</div>
              <button onClick={() => removeFromWishlistHandler(item._id)} className="text-red-500 hover:text-red-400">
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistScreen;