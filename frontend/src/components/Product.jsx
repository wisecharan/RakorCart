import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl group">
      <Link to={`/product/${product._id}`}>
        <div className="overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-56 object-cover transform transition-transform duration-300 group-hover:scale-105" 
          />
        </div>
      </Link>
      <div className="p-4 text-center">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-semibold text-text-dark hover:text-primary transition-colors truncate">
            {product.name}
          </h3>
        </Link>
        
        <div className="my-2 flex justify-center">
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </div>
        
        <p className="text-xl font-bold text-text-dark mb-4">${product.price}</p>

        <Link to={`/product/${product._id}`}>
          <button className="w-full bg-primary text-white font-bold py-2 rounded-md hover:bg-primary-hover transition-colors duration-300">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Product;