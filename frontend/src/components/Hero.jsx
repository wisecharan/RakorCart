import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <>
      {/* Upgraded Hero Section */}
      <div className="relative bg-gray-900 h-[80vh] rounded-2xl overflow-hidden mb-16">
        {/* Background with overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center transform scale-105"
          style={{ 
            backgroundImage: "url('https://images.pexels.com/photos/2284169/pexels-photo-2284169.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
            filter: 'brightness(0.7) contrast(1.1)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 h-full flex items-center relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            {/* Text Content */}
            <div className="text-white space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Limited Time Offer</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Start's at just
                <span className="block text-6xl md:text-8xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mt-2">
                  ₹925/
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-md leading-relaxed">
                Discover premium quality with unbeatable prices. Elevate your style without compromising your budget.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/" className="flex-1 max-w-xs">
                  <button className="w-full bg-white text-gray-900 font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                    SHOP COLLECTION
                  </button>
                </Link>
                <Link to="/products" className="flex-1 max-w-xs">
                  <button className="w-full border-2 border-white text-white font-bold py-4 px-8 rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
                    VIEW DEALS
                  </button>
                </Link>
              </div>
            </div>

            {/* Image Stats Card */}
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl max-w-md ml-auto">
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-white/20">
                    <span className="text-gray-300">Premium Quality</span>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map((star) => (
                        <div key={star} className="w-4 h-4 bg-yellow-400 rounded-sm"></div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-white/5 rounded-lg">
                      <div className="text-2xl font-bold text-white">500+</div>
                      <div className="text-sm text-gray-300">Styles</div>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-lg">
                      <div className="text-2xl font-bold text-white">10K+</div>
                      <div className="text-sm text-gray-300">Sold</div>
                    </div>
                  </div>
                  
                  <div className="text-center text-sm text-gray-300">
                    Join our community of fashion enthusiasts
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;