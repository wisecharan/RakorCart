import Hero from '../components/Hero';
import WhyChooseUs from '../components/WhyChooseUs';
import CategoryShowcase from '../components/CategoryShowcase';
import Testimonials from '../components/Testimonials';
import InfoBanner from '../components/InfoBanner';
import ProductCarousel from '../components/ProductCarousel';
import Product from '../components/Product';
import Paginate from '../components/Paginate';
import FAQSection from '../components/FAQSection';
import { Link, useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';

const HomeScreen = () => {
  const { keyword, pageNumber } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({ keyword, pageNumber });

  return (
    <div>
      {/* Conditionally render marketing sections only when not searching */}
      {!keyword ? (
        <>
          <Hero />
          <WhyChooseUs />
          <CategoryShowcase />
          <section className="py-16">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl font-bold text-text-dark mb-10">Shop Our Customer's Favorites</h2>
              {/* This uses your existing Top Products Carousel */}
              <ProductCarousel /> 
            </div>
          </section>
          <Testimonials />
          <InfoBanner />
        </>
      ) : (
        <Link to="/" className="inline-block mb-6 text-primary font-semibold hover:underline">
          &larr; Back to Home
        </Link>
      )}

      {/* This section displays either Latest Products or Search Results */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-text-dark mb-10">
            {keyword ? `Search Results for "${keyword}"` : "Our Latest Products"}
          </h2>
          {isLoading ? (
            <p className="text-center">Loading products...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error?.data?.message || error.error}</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data.products.map((product) => (
                  <div key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <div className="mt-12 flex justify-center">
                <Paginate pages={data.pages} page={data.page} keyword={keyword ? keyword : ''} />
              </div>
            </>
          )}
        </div>
      </section>

      {/* Conditionally render FAQ section only when not searching */}
      {!keyword && <FAQSection />}
    </div>
  );
};

export default HomeScreen;