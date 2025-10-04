import { Link } from 'react-router-dom';
import { HiOutlineChevronDown } from 'react-icons/hi2';

const Footer = () => {
  return (
    <footer className="bg-background text-text-dark mt-auto py-10 border-t border-border-light">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div className="md:col-span-1">
          <h2 className="text-3xl font-bold mb-2">RakorGo</h2>
          <p className="text-gray-600 text-sm">
            Your source for the finest natural products, delivered right to your door.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="text-gray-600 hover:text-primary hover:underline">Home</Link></li>
            <li><Link to="/products" className="text-gray-600 hover:text-primary hover:underline">Shop All</Link></li>
            <li><Link to="/faq" className="text-gray-600 hover:text-primary hover:underline">FAQ</Link></li>
            <li><Link to="/contact" className="text-gray-600 hover:text-primary hover:underline">Contact Us</Link></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="text-lg font-bold mb-4">Customer Care</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/shipping-policy" className="text-gray-600 hover:text-primary hover:underline">Shipping Policy</Link></li>
            <li><Link to="/refund-policy" className="text-gray-600 hover:text-primary hover:underline">Refund Policy</Link></li>
            <li><Link to="/privacy-policy" className="text-gray-600 hover:text-primary hover:underline">Privacy Policy</Link></li>
            <li><Link to="/terms-of-service" className="text-gray-600 hover:text-primary hover:underline">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border-light mt-10 pt-6 text-sm">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-center md:text-left mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} RakorGo. All Rights Reserved.
          </p>
          {/* You can add social media icons or other elements here if you wish */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;