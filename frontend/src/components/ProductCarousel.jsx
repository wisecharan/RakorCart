import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? null : error ? ( <p className="text-red-500">{error?.data?.message || error.error}</p> ) : (
    <Carousel pauseOnHover autoPlay infiniteLoop showThumbs={false} className="mb-8">
      {products.map((product) => (
        <div key={product._id}>
          <Link to={`/product/${product._id}`}>
            <img src={product.image} alt={product.name} className="h-96 object-contain" />
            <p className="legend text-lg font-semibold">{product.name} (${product.price})</p>
          </Link>
        </div>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;