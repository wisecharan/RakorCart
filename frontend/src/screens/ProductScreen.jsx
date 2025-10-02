import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useGetProductDetailsQuery, useCreateReviewMutation } from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../slices/wishlistSlice';

const ProductScreen = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    <div className="container mx-auto px-4 py-8 text-white">
      <Link to="/" className="inline-block mb-4 bg-gray-700 font-semibold py-2 px-4 rounded hover:bg-gray-600">Go Back</Link>
      {isLoading ? <p>Loading...</p> : error ? <p className="text-red-500">{error?.data?.message || error.error}</p> : (
        <>
          {/* Product Details Section */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <img src={product.image} alt={product.name} className="w-full rounded-lg" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-gray-400 mb-4">{product.description}</p>
              <div className="border-t border-b border-gray-700 py-4">
                <p className="text-3xl font-bold">${product.price}</p>
                <p className="mt-2">
                  Status: {product.countInStock > 0 ? <span className="text-green-400">In Stock</span> : <span className="text-red-400">Out of Stock</span>}
                </p>
                {product.countInStock > 0 && (
                  <div className="mt-4 flex items-center">
                    <label htmlFor="qty" className="mr-4">Qty</label>
                    <select id="qty" value={qty} onChange={(e) => setQty(Number(e.target.value))} className="bg-gray-700 border border-gray-600 rounded-md p-2">
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <button onClick={addToCartHandler} className="mt-6 w-full bg-blue-600 font-bold py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-500" disabled={product.countInStock === 0}>
                Add to Cart
              </button>
              <div className="mt-4 flex justify-center">
                <button onClick={wishlistHandler} className="flex items-center text-gray-400 hover:text-red-500">
                  {isWishlisted ? <FaHeart className="text-red-500 mr-2" /> : <FaRegHeart className="mr-2" />}
                  {isWishlisted ? 'Saved to Wishlist' : 'Save to Wishlist'}
                </button>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Reviews</h2>
              {product.reviews.length === 0 && <p className="p-4 bg-gray-800 rounded-lg">No Reviews</p>}
              <div className="space-y-4">
                {product.reviews.map(review => (
                  <div key={review._id} className="p-4 bg-gray-800 rounded-lg">
                    <p className="font-bold">{review.name}</p>
                    <p className="text-sm text-gray-400">{review.createdAt.substring(0, 10)}</p>
                    <p className="mt-2">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Write a Customer Review</h2>
              {loadingReview && <p>Loading...</p>}
              {userInfo ? (
                <form onSubmit={submitHandler} className="p-4 bg-gray-800 rounded-lg">
                  <div className="mb-4">
                    <label htmlFor="rating" className="block mb-2">Rating</label>
                    <select id="rating" required value={rating} onChange={(e) => setRating(e.target.value)} className="w-full p-2 bg-gray-700 rounded">
                      <option value="">Select...</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="comment" className="block mb-2">Comment</label>
                    <textarea id="comment" required rows="3" value={comment} onChange={(e) => setComment(e.target.value)} className="w-full p-2 bg-gray-700 rounded"></textarea>
                  </div>
                  <button disabled={loadingReview} type="submit" className="w-full bg-blue-600 font-bold py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-500">
                    Submit
                  </button>
                </form>
              ) : (
                <p className="p-4 bg-gray-800 rounded-lg">Please <Link to="/login" className="underline font-bold">sign in</Link> to write a review.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductScreen;