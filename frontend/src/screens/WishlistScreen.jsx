import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import { removeFromWishlist } from '../slices/wishlistSlice';
import { toast } from 'react-toastify';

const WishlistScreen = () => {
  const dispatch = useDispatch();
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const removeFromWishlistHandler = (id) => {
    dispatch(removeFromWishlist(id));
    toast.info('Item removed from wishlist');
  };

  return (
    <div className="container mx-auto mt-8 text-text-dark">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <div className="text-center p-8 bg-white rounded-lg shadow-md border border-border-light">
          <p className="text-xl text-gray-600">Your wishlist is empty.</p>
          <Link to="/" className="text-primary hover:underline mt-4 inline-block font-semibold">Go Shopping</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {wishlistItems.map((item) => (
            <div key={item._id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-border-light">
              <div className="flex items-center flex-grow">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded mr-4"/>
                <div>
                  <Link to={`/product/${item._id}`} className="font-semibold text-text-dark hover:text-primary transition-colors">
                    {item.name}
                  </Link>
                  <p className="font-bold text-text-dark mt-1">${item.price}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Link to={`/product/${item._id}`}>
                  <button className="bg-primary text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-primary-hover">
                    View Item
                  </button>
                </Link>
                <button onClick={() => removeFromWishlistHandler(item._id)} className="text-gray-500 hover:text-red-500 transition-colors">
                  <FaTrash size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistScreen;