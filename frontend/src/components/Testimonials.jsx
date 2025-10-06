const Testimonials = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-gray-800 text-white px-6 py-3 rounded-full mb-6">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-sm font-medium uppercase tracking-wide">Customer Stories</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Listen From Our <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Customers</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover why thousands of customers trust us for their daily needs
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Testimonial 1 */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-gray-200 transition-all duration-500 group hover:shadow-lg">
            <div className="text-yellow-500 text-4xl mb-4">"</div>
            <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
              "Cow Ghee, it's really good. When the quality is not compromised price wouldn't be an issue."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">VR</span>
              </div>
              <div>
                <p className="text-gray-900 font-semibold">Venkateswara Rao</p>
                <p className="text-gray-500 text-sm">Regular Customer</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-gray-200 transition-all duration-500 group hover:shadow-lg">
            <div className="text-yellow-500 text-4xl mb-4">"</div>
            <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
              "The quality of products is exceptional. Fast delivery and great customer service made my shopping experience wonderful."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">PS</span>
              </div>
              <div>
                <p className="text-gray-900 font-semibold">Priya Sharma</p>
                <p className="text-gray-500 text-sm">Premium Member</p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-gray-200 transition-all duration-500 group hover:shadow-lg">
            <div className="text-yellow-500 text-4xl mb-4">"</div>
            <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
              "Best prices with genuine quality. I've been shopping here for over a year and never been disappointed."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">RK</span>
              </div>
              <div>
                <p className="text-gray-900 font-semibold">Rahul Kumar</p>
                <p className="text-gray-500 text-sm">Verified Buyer</p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">10K+</div>
              <div className="text-gray-600 text-sm">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">4.8★</div>
              <div className="text-gray-600 text-sm">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">98%</div>
              <div className="text-gray-600 text-sm">Recommend Us</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
              <div className="text-gray-600 text-sm">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;