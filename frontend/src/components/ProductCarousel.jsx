import { Link } from 'react-router-dom';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white rounded-lg border border-gray-200">
                  <div className="h-64 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-3"></div>
                    <div className="h-8 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <div className="bg-white rounded-2xl p-8 border border-gray-200 max-w-md mx-auto shadow-sm">
            <div className="text-gray-500 text-4xl mb-4">⚠️</div>
            <p className="text-gray-600 mb-4 text-lg">Unable to load featured products</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-5 bg-gray-50">
      <div className="container mx-auto px-6">

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.slice(0, 3).map((product) => (
            <Link 
              key={product._id} 
              to={`/product/${product._id}`}
              className="group"
            >
              <div className="bg-white rounded-xl border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-lg overflow-hidden h-full flex flex-col">
                {/* Product Image with White Background */}
                <div className="relative bg-white h-72 flex items-center justify-center p-8 border-b border-gray-100">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="max-h-48 object-contain transform group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Rating Badge - Only if rating exists */}
                  {product.rating && (
                    <div className="absolute top-4 left-4 bg-white rounded-full px-3 py-1 flex items-center gap-1 shadow-sm border border-gray-200">
                      <span className="text-yellow-500 text-sm">★</span>
                      <span className="text-gray-800 text-sm font-medium">
                        {product.rating}
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-bold text-gray-900 text-lg mb-3 group-hover:text-gray-700 transition-colors leading-tight">
                    {product.name}
                  </h3>
                  
                  {/* Product Description/Features */}
                  <p className="text-gray-500 text-sm mb-4 flex-1 leading-relaxed">
                    {product.description || "Premium quality product with excellent features and durability."}
                  </p>
                  
                  {/* Price and CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-gray-900">
                        ${product.price}
                      </span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-lg text-gray-400 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    
                    {/* View Details */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="inline-flex items-center gap-1 text-gray-600 text-sm font-medium">
                        View
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gray-800 group-hover:w-full transition-all duration-500"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;