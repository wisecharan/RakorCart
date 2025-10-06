import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-900 mt-auto py-12">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="md:col-span-1">

            <h2 className="text-2xl font-bold text-gray-900 mb-3">RakorGo</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Your premier destination for quality products, delivered right to your door with exceptional service.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-gray-900 text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors text-sm flex items-center gap-2 group">
                  <div className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-gray-600 transition-colors"></div>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 hover:text-gray-900 transition-colors text-sm flex items-center gap-2 group">
                  <div className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-gray-600 transition-colors"></div>
                  Shop All
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-600 hover:text-gray-900 transition-colors text-sm flex items-center gap-2 group">
                  <div className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-gray-600 transition-colors"></div>
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="text-gray-600 hover:text-gray-900 transition-colors text-sm flex items-center gap-2 group">
                  <div className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-gray-600 transition-colors"></div>
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="font-bold text-gray-900 text-lg mb-4">Customer Care</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/shipping-policy" className="text-gray-600 hover:text-gray-900 transition-colors text-sm flex items-center gap-2 group">
                  <div className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-gray-600 transition-colors"></div>
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="text-gray-600 hover:text-gray-900 transition-colors text-sm flex items-center gap-2 group">
                  <div className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-gray-600 transition-colors"></div>
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-600 hover:text-gray-900 transition-colors text-sm flex items-center gap-2 group">
                  <div className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-gray-600 transition-colors"></div>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-gray-600 hover:text-gray-900 transition-colors text-sm flex items-center gap-2 group">
                  <div className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-gray-600 transition-colors"></div>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-gray-900 text-lg mb-4">Get In Touch</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                support@rakorgo.com
              </p>
              <p className="flex items-center gap-2">
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                +1 (555) 123-4567
              </p>
              <p className="flex items-center gap-2">
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                Mon-Fri: 9AM-6PM
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} RakorGo. All Rights Reserved.
            </p>
            <div className="flex items-center gap-6 text-gray-500 text-sm">
              <Link to="/privacy" className="hover:text-gray-700 transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-gray-700 transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;