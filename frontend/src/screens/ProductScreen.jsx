import { useParams, Link } from 'react-router-dom';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';

const ProductScreen = () => {
  const { id: productId } = useParams();

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

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
            </div>
            <button
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