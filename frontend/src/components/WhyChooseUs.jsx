const featureCards = [
  {
    imgSrc: "https://images.pexels.com/photos/4482900/pexels-photo-4482900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Fast & Free Delivery",
    description: "Get your orders delivered quickly with our free shipping on orders above ₹499. Same-day delivery available in select cities.",
  },
  {
    imgSrc: "https://images.pexels.com/photos/3944407/pexels-photo-3944407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Easy Returns & Refunds",
    description: "Not happy with your purchase? Return it within 30 days for a quick and hassle-free refund process.",
  },
  {
    imgSrc: "https://images.pexels.com/photos/6214470/pexels-photo-6214470.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Genuine Products",
    description: "100% authentic products with manufacturer warranty. Shop with trust from verified sellers.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-gray-800 text-white px-6 py-3 rounded-full mb-6">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-sm font-medium uppercase tracking-wide">Why Shop With Us</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            The <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Smart Choice</span> for Shopping
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Experience seamless shopping with benefits that make us the preferred destination for millions of customers across India.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {featureCards.map((card, index) => (
            <div 
              key={index} 
              className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gray-200"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden bg-gray-100">
                <img 
                  src={card.imgSrc} 
                  alt={card.title}
                  className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {card.description}
                </p>
                
                {/* Learn More Link */}
                <div className="flex items-center gap-2 text-gray-800 font-medium text-sm group-hover:text-gray-600 transition-colors duration-300 cursor-pointer">
                  <span>Learn more</span>
                  <div className="transform group-hover:translate-x-1 transition-transform duration-300">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gray-800 group-hover:w-full transition-all duration-500"></div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 pt-12 border-t border-gray-200">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">15k+</div>
              <div className="text-gray-600 text-sm">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">1K+</div>
              <div className="text-gray-600 text-sm">Products Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
              <div className="text-gray-600 text-sm">Cities Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
              <div className="text-gray-600 text-sm">Customer Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;