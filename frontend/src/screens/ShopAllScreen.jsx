import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Paginate from '../components/Paginate';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import { toast } from 'react-toastify';

// Product Component: Now with a functional "Add to Cart" button
const Product = ({ product }) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    // Dispatch the addToCart action with the product data
    dispatch(addToCart(product));
    // Show a success notification
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 group flex flex-col h-full">
      <Link to={`/product/${product._id}`} className="flex flex-col flex-1">
        <div className="bg-white rounded-xl mb-4 overflow-hidden flex items-center justify-center aspect-square p-4">
          <img
            src={product.image}
            alt={product.name}
            className="object-contain w-full h-full max-h-48 transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="text-center flex flex-col flex-grow">
          <div className="flex-grow">
            <h3 className="text-1xl font-semibold text-gray-900 mb-2 leading-tight min-h-[56px] flex items-center justify-center">
              {product.name}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[40px]">
              {product.description}
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 mb-4">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price}
            </span>
          </div>
        </div>
      </Link>
      
      {/* Attach the handler to the onClick event */}
      <button 
        onClick={addToCartHandler}
        className="w-full bg-white text-gray-900 font-medium py-3 px-6 rounded-xl border border-gray-200 hover:bg-gray-800 hover:text-white transition-colors text-base"
      >
        Add to Cart
      </button>
    </div>
  );
};


// Main ShopAllScreen Component (No major changes here)
const ShopAllScreen = () => {
  const { pageNumber } = useParams();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    price: '',
    sort: 'featured'
  });

  const { data, isLoading, error } = useGetProductsQuery({ 
    pageNumber, 
    ...selectedFilters 
  });

  const categories = ['Electronics', 'Accessories', 'Lifestyle', 'Home'];
  const priceRanges = [
    { label: 'All Prices', value: '' },
    { label: 'Under $100', value: '0-100' },
    { label: '$100 - $500', value: '100-500' },
    { label: '$500 - $1000', value: '500-1000' },
    { label: 'Over $1000', value: '1000+' }
  ];

  const sortOptions = [
    { label: 'Featured', value: 'featured' },
    { label: 'Newest', value: 'newest' },
    { label: 'Price: Low to High', value: 'price-low' },
    { label: 'Price: High to Low', value: 'price-high' },
    { label: 'Name: A to Z', value: 'name-asc' }
  ];

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handleCategoryToggle = (category) => {
    setSelectedFilters(prev => ({
      ...prev,
      category: prev.category.includes(category)
        ? prev.category.filter(c => c !== category)
        : [...prev.category, category]
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({ category: [], price: '', sort: 'featured' });
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-white-50">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-semibold text-gray-900 mb-6 tracking-tight">
              Shop All Products
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Discover innovation and premium quality in every product.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div className="text-gray-600 text-base">
            {!isLoading && !error && data && (
              <span>Showing {data.products.length} of {data.count} product{data.count !== 1 ? 's' : ''}</span>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="relative">
              <select 
                value={selectedFilters.sort}
                onChange={(e) => handleFilterChange('sort', e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent w-full sm:w-48"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-3 bg-gray-900 text-white rounded-lg px-6 py-3 text-base hover:bg-gray-800 transition-colors w-full sm:w-auto justify-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" /></svg>
              Filters
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="bg-gray-50 rounded-2xl p-8 mb-8 border border-gray-200">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-semibold text-gray-900">Filters</h3>
              <button onClick={clearFilters} className="text-base text-gray-600 hover:text-gray-900 transition-colors">Clear All</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <h4 className="text-base font-medium text-gray-900 mb-4">Category</h4>
                <div className="space-y-3">
                  {categories.map(category => (
                    <label key={category} className="flex items-center gap-3 text-base text-gray-700 cursor-pointer">
                      <input type="checkbox" checked={selectedFilters.category.includes(category)} onChange={() => handleCategoryToggle(category)} className="rounded border-gray-300 text-gray-800 focus:ring-gray-800 w-5 h-5"/>
                      {category}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-base font-medium text-gray-900 mb-4">Price</h4>
                <div className="space-y-3">
                  {priceRanges.map(range => (
                    <label key={range.value} className="flex items-center gap-3 text-base text-gray-700 cursor-pointer">
                      <input type="radio" name="price" value={range.value} checked={selectedFilters.price === range.value} onChange={(e) => handleFilterChange('price', e.target.value)} className="text-gray-800 focus:ring-gray-800 w-5 h-5"/>
                      {range.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="animate-pulse bg-white rounded-2xl p-6 border border-gray-100">
                <div className="bg-gray-200 rounded-xl aspect-square mb-6"></div>
                <div className="space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mx-auto"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mt-4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto"><div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6"><svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg></div><h3 className="text-2xl font-semibold text-gray-900 mb-3">Unable to Load Products</h3><p className="text-gray-600 mb-6 text-lg">{error?.data?.message || error.error}</p><button onClick={() => window.location.reload()} className="bg-gray-900 text-white font-medium py-3 px-8 rounded-full hover:bg-gray-800 transition-colors inline-flex items-center gap-3 text-base"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>Try Again</button></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {data.products.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
            {data.pages > 1 && (
              <div className="mt-16 flex justify-center">
                <Paginate pages={data.pages} page={data.page} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ShopAllScreen;