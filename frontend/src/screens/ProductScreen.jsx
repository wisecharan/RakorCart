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
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-8">
        {/* Minimal Back Button */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors mb-8 text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </Link>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">{error?.data?.message || error.error}</p>
          </div>
        ) : (
          <>
            <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
              {/* Product Image */}
              <div className="p-2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto rounded-lg"
                />
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
                    {product.name}
                  </h1>
                  <div className="flex items-center gap-4 mb-4">
                    <Rating value={product.rating} />
                    <span className="text-gray-500 text-sm">
                      {product.numReviews} review{product.numReviews !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
                  <p className="text-gray-500 text-sm">Tax included. Shipping calculated at checkout.</p>
                </div>

                {/* Stock Status */}
                <div className={`text-sm font-medium ${product.countInStock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4 py-6 border-t border-gray-100">
                  <span className="text-gray-700 font-medium">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      disabled={qty <= 1}
                      className="px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      -
                    </button>
                    <span className="px-6 py-2 border-l border-r border-gray-300 text-gray-900 font-medium">
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty(Math.min(product.countInStock, qty + 1))}
                      disabled={qty >= product.countInStock}
                      className="px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={addToCartHandler}
                    disabled={product.countInStock === 0}
                    className="w-full bg-gray-900 text-white font-medium py-4 px-6 rounded-xl hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={addToCartHandler}
                    disabled={product.countInStock === 0}
                    className="w-full border border-gray-900 text-gray-900 font-medium py-4 px-6 rounded-xl hover:bg-gray-50 disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Buy Now
                  </button>
                </div>

                {/* Wishlist Button */}
                <div className="flex justify-center pt-4">
                  <button
                    onClick={wishlistHandler}
                    className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors"
                  >
                    {isWishlisted ? (
                      <FaHeart className="text-red-500" size={18} />
                    ) : (
                      <FaRegHeart size={18} />
                    )}
                    <span className="text-sm">
                      {isWishlisted ? 'Saved to Wishlist' : 'Save to Wishlist'}
                    </span>
                  </button>
                </div>

                {/* Description */}
                <div className="pt-8 border-t border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-4">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>
              </div>
            </div>

            {/* Reviews Section - Minimalistic */}
            <div className="max-w-4xl mx-auto mt-20">
              <div className="border-t border-gray-100 pt-16">
                <h2 className="text-2xl font-semibold text-gray-900 mb-8">Customer Reviews</h2>

                {/* Review Form */}
                {userInfo && (
                  <div className="bg-gray-50 rounded-xl p-6 mb-8">
                    <h3 className="font-semibold text-gray-900 mb-4">Write a Review</h3>
                    <form onSubmit={submitHandler} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                        <select
                          value={rating}
                          onChange={(e) => setRating(Number(e.target.value))}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
                        <textarea
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          rows="3"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent resize-none"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={loadingReview}
                        className="bg-gray-900 text-white font-medium py-2.5 px-6 rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors"
                      >
                        Submit Review
                      </button>
                    </form>
                  </div>
                )}

                {/* Reviews List */}
                <div className="space-y-6">
                  {product.reviews && product.reviews.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No reviews yet.</p>
                  ) : (
                    product.reviews && product.reviews.map((review) => (
                      <div key={review._id} className="border-b border-gray-100 pb-6 last:border-b-0">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-600">
                              {review.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{review.name}</p>
                            <div className="flex items-center gap-2">
                              <Rating value={review.rating} />
                              <span className="text-sm text-gray-500">
                                {new Date(review.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductScreen;