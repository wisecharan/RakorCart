import { useState } from 'react';
import { HiOutlinePlus, HiOutlineMinus } from 'react-icons/hi2';

const faqItems = [
  {
    question: 'How much time does it take for shipping?',
    answer: 'It takes around 4-6 days for your order to get delivered.'
  },
  {
    question: 'Do you accept returns and refunds?',
    answer: 'Yes, we have a 30-day return policy for unused items in their original condition. Please visit our Refund Policy page for more details.'
  },
  {
    question: 'What payment gateways do you accept?',
    answer: 'We currently accept payments through PayPal, which allows you to use your PayPal balance or any major credit/debit card securely.'
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Yes, we ship to over 50 countries worldwide. Shipping times and costs may vary depending on your location.'
  },
  {
    question: 'Can I track my order?',
    answer: 'Absolutely! Once your order ships, you will receive a tracking number via email to monitor your package in real-time.'
  },
  {
    question: 'What is your warranty policy?',
    answer: 'All our products come with a 1-year manufacturer warranty. Extended warranty options are available for select items.'
  },
  {
    question: 'How do I contact customer support?',
    answer: 'You can reach our customer support team via email at support@example.com, phone at 1-800-123-4567, or through our live chat available during business hours.'
  },
  {
    question: 'Do you offer student discounts?',
    answer: 'Yes, we offer a 10% student discount for verified students. Please contact our support team with your student ID to get your discount code.'
  }
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Filter FAQs based on search term
  const filteredItems = faqItems.filter(item => 
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="border-b border-gray-100">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-semibold text-gray-900 mb-6 tracking-tight">
              Help Center
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Find answers to frequently asked questions about orders, shipping, returns, and more.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 pl-12 text-lg border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent bg-white"
                />
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-0">
        <div className="container mx-auto px-6">
          {searchTerm && (
            <div className="text-center mb-8">
              <p className="text-gray-600 text-lg">
                {filteredItems.length} results found for "{searchTerm}"
              </p>
            </div>
          )}

          <div className="max-w-4xl mx-auto">
            <div className="grid gap-4">
              {filteredItems.map((item, index) => (
                <div 
                  key={index} 
                  className={`bg-white rounded-xl border border-gray-200 transition-all duration-300 ${
                    openIndex === index ? 'shadow-lg' : 'shadow-sm hover:shadow-md'
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex justify-between items-center text-left p-6 hover:bg-gray-50 transition-colors duration-200 rounded-xl"
                  >
                    <span className="text-lg font-semibold text-gray-900 pr-6">
                      {item.question}
                    </span>
                    <div className="flex-shrink-0">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        openIndex === index 
                          ? 'bg-gray-900 text-white' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}>
                        {openIndex === index ? (
                          <HiOutlineMinus size={20} />
                        ) : (
                          <HiOutlinePlus size={20} />
                        )}
                      </div>
                    </div>
                  </button>
                  
                  {/* Animated Content */}
                  <div className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="p-6 pt-2 border-t border-gray-100">
                      <p className="text-base text-gray-600 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredItems.length === 0 && searchTerm && (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-600">
                    We couldn't find any FAQs matching "{searchTerm}". Try different keywords or contact our support team.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;