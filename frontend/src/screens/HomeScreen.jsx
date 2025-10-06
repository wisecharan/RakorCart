import Hero from '../components/Hero';
import WhyChooseUs from '../components/WhyChooseUs';
import CategoryShowcase from '../components/CategoryShowcase';
import Testimonials from '../components/Testimonials';
import ProductCarousel from '../components/ProductCarousel';
import Paginate from '../components/Paginate';
import FAQSection from '../components/FAQSection';
import { Link, useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';

const HomeScreen = () => {
  const { keyword, pageNumber } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({ keyword, pageNumber });

  return (
    <div className="bg-gray-50">
      {/* Conditionally render marketing sections only when not searching */}
      {!keyword ? (
        <>
          <Hero />
          <WhyChooseUs />
          <CategoryShowcase />

          {/* Featured Products Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-3 bg-gray-800 text-white px-6 py-3 rounded-full mb-6">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium uppercase tracking-wide">Customer Favorites</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Shop Our <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Customer's Favorites</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Discover the products our customers love the most
                </p>
              </div>
              <ProductCarousel />
            </div>
          </section>

          <Testimonials />
        </>
      ) : (
        <div className="container mx-auto px-6 pt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors group"
          >
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>
      )}

      {/* Products Section - Latest Products or Search Results */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            {keyword ? (
              <>
                <div className="inline-flex items-center gap-3 bg-gray-800 text-white px-6 py-3 rounded-full mb-6">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium uppercase tracking-wide">Search Results</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Results for "<span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">{keyword}"</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  We found {data?.products.length || 0} product{data?.products.length !== 1 ? 's' : ''} matching your search
                </p>
              </>
            ) : (
              <>
                <div className="inline-flex items-center gap-3 bg-gray-800 text-white px-6 py-3 rounded-full mb-6">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium uppercase tracking-wide">Latest Arrivals</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Our <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Latest Products</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Explore our newest additions and stay ahead with the latest trends
                </p>
              </>
            )}
          </div>

          {/* Products Grid with Horizontal Scroll */}
          {isLoading ? (
            <div className="flex gap-6 overflow-x-hidden pb-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="animate-pulse flex-shrink-0 w-80">
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="bg-gray-200 h-60"></div>
                    <div className="p-6 space-y-3">
                      <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-8 bg-gray-200 rounded mt-4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="bg-white rounded-xl p-6 border border-gray-200 max-w-md mx-auto">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Unable to Load Products</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {error?.data?.message || error.error || 'There was an issue loading the products. Please try again.'}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-gray-800 text-white font-medium py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors inline-flex items-center gap-2 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Try Again
                </button>
              </div>
            </div>
          ) : (
            <>
              {data.products.length === 0 ? (
                <div className="text-center py-12">
                  <div className="bg-white rounded-xl p-6 border border-gray-200 max-w-md mx-auto">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">No Products Found</h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      {keyword ? `We couldn't find any products matching "${keyword}". Try searching with different keywords.` : 'No products are currently available. Please check back later.'}
                    </p>
                    {keyword && (
                      <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-gray-800 font-medium hover:text-gray-600 transition-colors group text-sm"
                      >
                        <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to all products
                      </Link>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  {/* Results Count for Search */}
                  {keyword && (
                    <div className="text-center mb-6">
                      <p className="text-gray-600 text-sm">
                        Showing {data.products.length} of {data.count} product{data.count !== 1 ? 's' : ''}
                      </p>
                    </div>
                  )}

                  {/* Horizontal Scrolling Container */}
                  <div className="relative">
                    {/* Scroll Left Button */}
                    <button
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:scale-110 -ml-5"
                      onClick={() => {
                        const container = document.getElementById('products-scroll-container');
                        container.scrollBy({ left: -320, behavior: 'smooth' });
                      }}
                    >
                      <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>

                    {/* Products Horizontal Scroll */}
                    <div
                      id="products-scroll-container"
                      className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory"
                      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                      {data.products.map((product) => (
                        <div
                          key={product._id}
                          className="group flex-shrink-0 w-80 snap-start"
                        >
                          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                            {/* Product Image */}
                            <div className="relative bg-white h-60 flex items-center justify-center p-6">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="max-h-44 object-contain transform group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>

                            {/* Product Info */}
                            <div className="p-6 flex-1 flex flex-col">
                              {/* Product Name */}
                              <h2 className="font-bold text-gray-900 text-lg mb-3 group-hover:text-gray-700 transition-colors leading-tight line-clamp-2">
                                {product.name}
                              </h2>

                              {/* Product Description */}
                              <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                                {product.description || "Premium quality product with excellent features and outstanding performance."}
                              </p>

                              {/* Price and CTA */}
                              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <div className="flex items-baseline gap-2">
                                  <span className="text-xl font-bold text-gray-900">
                                    ${product.price}
                                  </span>
                                  {product.originalPrice && product.originalPrice > product.price && (
                                    <span className="text-sm text-gray-400 line-through">
                                      ${product.originalPrice}
                                    </span>
                                  )}
                                </div>

                                {/* View Details Button */}
                                <button className="bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm">
                                  View Details
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Scroll Right Button */}
                    <button
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:scale-110 -mr-5"
                      onClick={() => {
                        const container = document.getElementById('products-scroll-container');
                        container.scrollBy({ left: 320, behavior: 'smooth' });
                      }}
                    >
                      <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  {/* Pagination */}
                  {data.pages > 1 && (
                    <div className="mt-8 flex justify-center">
                      <Paginate pages={data.pages} page={data.page} keyword={keyword ? keyword : ''} />
                    </div>
                  )}
                </>
              )}
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