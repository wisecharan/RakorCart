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
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Find quick answers to common questions about our products, shipping, and policies.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-3">
            {faqItems.map((item, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-xl border border-gray-200 transition-all duration-300 ${
                  openIndex === index ? 'shadow-md' : 'shadow-sm hover:shadow-sm'
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
        </div>
      </div>
    </section>
  );
};

export default FAQSection;