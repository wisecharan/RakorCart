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
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-text-dark mb-10">FAQs</h2>
        <div className="max-w-3xl mx-auto text-left space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-border-light overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left p-5 font-semibold text-text-dark bg-gray-50 hover:bg-gray-100"
              >
                <span>{item.question}</span>
                <span className="text-primary">
                  {openIndex === index ? <HiOutlineMinus size={20} /> : <HiOutlinePlus size={20} />}
                </span>
              </button>
              {openIndex === index && (
                <div className="p-5 border-t border-border-light">
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;