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
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-semibold text-gray-900 mb-4 tracking-tight">My Wishlist</h1>
            <p className="text-gray-600 text-lg">Your saved items for later</p>
          </div>

          {wishlistItems.length === 0 ? (
            <div className="text-center py-20 max-w-md mx-auto">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Your wishlist is empty</h3>
              <p className="text-gray-600 mb-6">Save items you love for later</p>
              <Link 
                to="/products" 
                className="inline-block bg-gray-900 text-white font-medium py-3 px-8 rounded-xl hover:bg-gray-800 transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {wishlistItems.map((item) => (
                <div 
                  key={item._id} 
                  className="flex items-center justify-between bg-white p-6 rounded-xl border border-gray-200 hover:shadow-sm transition-all duration-200"
                >
                  <div className="flex items-center flex-grow">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 object-contain rounded-lg mr-6"
                    />
                    <div className="flex-grow">
                      <Link 
                        to={`/product/${item._id}`} 
                        className="font-semibold text-gray-900 hover:text-gray-700 transition-colors text-lg block mb-1"
                      >
                        {item.name}
                      </Link>
                      <p className="font-bold text-gray-900 text-xl">${item.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Link to={`/product/${item._id}`}>
                      <button className="border border-gray-900 text-gray-900 font-medium py-2.5 px-6 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                        View Item
                      </button>
                    </Link>
                    <button 
                      onClick={() => removeFromWishlistHandler(item._id)} 
                      className="text-gray-400 hover:text-red-500 transition-colors p-2"
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistScreen;