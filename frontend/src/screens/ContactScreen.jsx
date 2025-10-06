import { useState } from 'react';
import { HiOutlinePhone, HiOutlineEnvelope, HiOutlineMapPin } from 'react-icons/hi2';

const ContactScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    // For now, this just logs the data. We can add email-sending logic later.
    console.log({ name, email, message });
    alert('Message sent (check console).');
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl font-semibold text-gray-900 mb-6 tracking-tight">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Get in touch with our team. We're here to help with any questions you may have.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Send us a message</h2>
            <form onSubmit={submitHandler} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-colors"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email*</label>
                <input
                  type="email"
                  id="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-colors"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  id="message"
                  rows="5"
                  placeholder="How can we help you?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gray-900 text-white font-medium py-4 px-6 rounded-xl hover:bg-gray-800 transition-colors text-base"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">Get in touch</h2>
              <p className="text-gray-600 text-lg mb-8">
                Have questions about our products or need support? Reach out to us through any of the channels below.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <HiOutlinePhone size={24} className="text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">Phone</h3>
                  <p className="text-gray-600">+91 90327 83863</p>
                  <p className="text-sm text-gray-500 mt-1">Mon-Fri from 9am to 6pm</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <HiOutlineEnvelope size={24} className="text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">Email</h3>
                  <p className="text-gray-600">getwebrakor@gmail.com</p>
                  <p className="text-sm text-gray-500 mt-1">We'll respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <HiOutlineMapPin size={24} className="text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">Address</h3>
                  <p className="text-gray-600">Secunderabad Hyderabad, Telangana</p>
                  <p className="text-gray-600">Pin - 500003</p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-gray-50 rounded-xl p-6 mt-8">
              <h4 className="font-semibold text-gray-900 mb-3">Response Time</h4>
              <p className="text-gray-600 text-sm">
                We typically respond to all inquiries within 24 hours during business days. 
                For urgent matters, please call us directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactScreen;