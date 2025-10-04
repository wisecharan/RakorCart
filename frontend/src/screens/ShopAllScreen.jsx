import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Product from '../components/Product';
import Paginate from '../components/Paginate';
import { Link } from 'react-router-dom';

const ShopAllScreen = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({ pageNumber });

  return (
    <div className="container mx-auto">
      <Link to="/" className="inline-block mb-6 text-primary font-semibold hover:underline">
        &larr; Back to Home
      </Link>
      <h1 className="text-3xl font-bold mb-6 text-text-dark">Shop All Products</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error?.data?.message || error.error}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.products.map((product) => (
              <div key={product._id}>
                <Product product={product} />
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Paginate pages={data.pages} page={data.page} />
          </div>
        </>
      )}
    </div>
  );
};

export default ShopAllScreen;