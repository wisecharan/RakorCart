import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';

const ProductScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State to manage the quantity selected by the user
  const [qty, setQty] = useState(1);

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  // Handler to dispatch the addToCart action and redirect
  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/"
        className="inline-block mb-4 bg-gray-700 text-white font-semibold py-2 px-4 rounded hover:bg-gray-600"
      >
        Go Back
      </Link>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error?.data?.message || error.error}</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-8 text-white">
          {/* Left Column: Image */}
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-lg"
            />
          </div>

          {/* Right Column: Details */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-400 mb-4">{product.description}</p>
            <div className="border-t border-b border-gray-700 py-4">
              <p className="text-3xl font-bold">${product.price}</p>
              <p className="mt-2">
                Status:{' '}
                {product.countInStock > 0 ? (
                  <span className="text-green-400">In Stock</span>
                ) : (
                  <span className="text-red-400">Out of Stock</span>
                )}
              </p>

              {/* Quantity Selector - NEW */}
              {product.countInStock > 0 && (
                <div className="mt-4 flex items-center">
                  <label htmlFor="qty" className="mr-4">Qty</label>
                  <select
                    id="qty"
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="bg-gray-700 border border-gray-600 rounded-md p-2"
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            
            {/* Add to Cart Button - UPDATED */}
            <button
              onClick={addToCartHandler}
              className="mt-6 w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-500"
              disabled={product.countInStock === 0}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductScreen;