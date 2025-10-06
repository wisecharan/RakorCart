import { Link } from "react-router-dom";

const categories = [
    { 
        name: "Electronics", 
        subtext: "Latest Gadgets & Devices", 
        img: "https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
    },
    { 
        name: "Fashion", 
        subtext: "Trending Styles", 
        img: "https://images.pexels.com/photos/952993/pexels-photo-952993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
    },
    { 
        name: "Home & Kitchen", 
        subtext: "Essential Appliances", 
        img: "https://images.pexels.com/photos/3621168/pexels-photo-3621168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
    },
    { 
        name: "Beauty", 
        subtext: "Premium Care Products", 
        img: "https://images.pexels.com/photos/354962/pexels-photo-354962.jpeg?_gl=1*qtlic7*_ga*MTgzOTYyNjUxNC4xNzU5NjUxNDQ4*_ga_8JE65Q40S6*czE3NTk2NTE0NDgkbzEkZzEkdDE3NTk2NTE5ODAkajQ2JGwwJGgw" 
    },
];

const CategoryShowcase = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-gray-800 text-white px-6 py-3 rounded-full mb-6">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-sm font-medium uppercase tracking-wide">Browse Categories</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Shop by <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Category</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover our wide range of products curated just for you
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {categories.map((category) => (
            <Link 
              to={`/category/${category.name.toLowerCase()}`} 
              key={category.name}
              className="group"
            >
              <div className="relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-gray-200">
                {/* Image Container */}
                <div className="relative overflow-hidden bg-gray-100">
                  <img
                    src={category.img}
                    alt={category.name}
                    className="w-full h-64 object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-sm p-6 border-t border-gray-100">
                  <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-gray-700 transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{category.subtext}</p>
                  
                  {/* Hover Arrow */}
                  <div className="absolute right-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
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

export default CategoryShowcase;