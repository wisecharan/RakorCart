import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useGetProductDetailsQuery, useCreateReviewMutation } from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../slices/wishlistSlice';
import Rating from '../components/Rating';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const ProductScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);
  const [createReview, { isLoading: loadingReview }] = useCreateReviewMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const isWishlisted = wishlistItems.some((p) => p._id === product?._id);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  const wishlistHandler = () => {
    if (!userInfo) {
      toast.error('Please sign in to save to wishlist');
      navigate('/login');
      return;
    }
    if (isWishlisted) {
      dispatch(removeFromWishlist(product._id));
      toast.info('Removed from wishlist');
    } else {
      dispatch(addToWishlist(product));
      toast.success('Added to wishlist');
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({ productId, rating, comment }).unwrap();
      refetch();
      toast.success('Review Submitted');
      setRating(0);
      setComment('');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="inline-block mb-6 text-primary font-semibold hover:underline">
        &larr; Back to Products
      </Link>

      {isLoading ? <p>Loading...</p> : error ? <p className="text-red-500">{error?.data?.message || error.error}</p> : (
        <>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column: Image */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <img src={product.image} alt={product.name} className="w-full rounded-lg" />
            </div>

            {/* Right Column: Details */}
            <div>
              <h1 className="text-3xl font-bold mb-3 text-text-dark">{product.name}</h1>
              <div className="mb-4">
                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
              </div>
              <p className="text-3xl font-bold text-text-dark mb-2">${product.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500 mb-6">Tax included. Shipping calculated at checkout.</p>
              
              <div className="border-t border-b border-border-light py-6">
                <div className="flex items-center mb-4">
                  <p className="mr-4 font-semibold">Quantity:</p>
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-1 font-bold text-lg" disabled={qty <= 1}>-</button>
                    <span className="px-4 py-1 border-l border-r border-gray-300">{qty}</span>
                    <button onClick={() => setQty(Math.min(product.countInStock, qty + 1))} className="px-3 py-1 font-bold text-lg" disabled={qty >= product.countInStock}>+</button>
                  </div>
                </div>
                <p className={`font-semibold ${product.countInStock > 0 ? 'text-green-600' : 'text-red-500'}`}>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</p>
              </div>

              <div className="mt-6 space-y-4">
                <button onClick={addToCartHandler} className="w-full bg-primary text-white font-bold py-3 rounded-md hover:bg-primary-hover transition-colors" disabled={product.countInStock === 0}>Add to Cart</button>
                <button onClick={addToCartHandler} className="w-full bg-amber-500 text-primary-hover font-bold py-3 rounded-md hover:bg-amber-600 transition-colors" disabled={product.countInStock === 0}>Buy Now</button>
              </div>

              {/* Wishlist Button Added Back Here */}
              <div className="mt-6 flex justify-center">
                <button onClick={wishlistHandler} className="flex items-center text-gray-500 hover:text-red-500 transition-all duration-300">
                  {isWishlisted ? <FaHeart className="text-red-500 mr-2" /> : <FaRegHeart className="mr-2" />}
                  {isWishlisted ? 'Saved to Wishlist' : 'Save to Wishlist'}
                </button>
              </div>

              <div className="mt-8 border border-border-light rounded-lg p-4">
                <h3 className="font-bold mb-2">Description</h3>
                <p className="text-gray-600 text-sm">{product.description}</p>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          {/* ... (Your existing reviews JSX) ... */}
        </>
      )}
    </div>
  );
};

export default ProductScreen;