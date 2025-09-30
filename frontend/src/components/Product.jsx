import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-semibold text-white hover:text-gray-300 truncate">
            {product.name}
          </h3>
        </Link>
        <div className="my-2">
          {/* We'll add a rating component here later */}
        </div>
        <p className="text-2xl font-bold text-white">${product.price}</p>
      </div>
    </div>
  );
};

export default Product;