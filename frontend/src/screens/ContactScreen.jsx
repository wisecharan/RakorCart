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
    <div className="container mx-auto py-8">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Left Column: Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-md border border-border-light">
          <h1 className="text-3xl font-bold mb-6 text-text-dark">Get In Touch</h1>
          <form onSubmit={submitHandler} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 uppercase">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-0 py-2 mt-1 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 uppercase">Email*</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-0 py-2 mt-1 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700 uppercase">Message</label>
              <textarea
                id="message"
                rows="4"
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full px-0 py-2 mt-1 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-primary transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 font-semibold text-white bg-primary rounded-md hover:bg-primary-hover transition-colors"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>

        {/* Right Column: Support Info */}
        <div className="space-y-8 mt-4 md:mt-0">
          <h2 className="text-3xl font-bold text-text-dark">Support</h2>
          <div className="flex items-start">
            <HiOutlinePhone size={24} className="text-primary mt-1 mr-4" />
            <div>
              <h3 className="font-semibold text-lg">Phone</h3>
              <p className="text-orange-600 font-medium">+91 90327 83863</p>
            </div>
          </div>
          <div className="flex items-start">
            <HiOutlineEnvelope size={24} className="text-primary mt-1 mr-4" />
            <div>
              <h3 className="font-semibold text-lg">Email</h3>
              <p className="text-orange-600 font-medium">getwebrakor@gmail.com</p>
            </div>
          </div>
          <div className="flex items-start">
            <HiOutlineMapPin size={24} className="text-primary mt-1 mr-4" />
            <div>
              <h3 className="font-semibold text-lg">Address</h3>
              <p className="text-gray-600">Secunderabad Hyderabad, Telangana, Pin - 500003</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactScreen;