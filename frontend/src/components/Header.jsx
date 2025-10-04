import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logout } from '../slices/authSlice';
import { useState, useRef, useEffect } from 'react';
// 1. Import minimalist icons from Heroicons
import { 
  HiOutlineMagnifyingGlass, 
  HiOutlineShoppingCart, 
  HiOutlineUser,
  HiOutlineChevronDown,
  HiOutlineXMark
} from 'react-icons/hi2';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef(null);

  const logoutHandler = async () => {
    try {
      // Assuming you have a logout mutation in your usersApiSlice
      // await logoutApiCall().unwrap();
      dispatch(logout());
      // dispatch(clearCart()); // Optional: clear cart on logout
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery.trim()}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    // 2. Changed header background color
    <header className="bg-background relative shadow-sm">
      {/* Main Navigation Bar - Single Row */}
      <div>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            {/* Brand Logo */}
            <Link to="/" className="flex flex-col items-start z-10">
              <span className="text-2xl font-bold text-gray-900 tracking-tight">RakorGo</span>
              <span className="text-sm text-gray-600 font-medium">FARIES</span>
            </Link>

            {/* Main Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-primary font-medium transition-colors text-sm">Home</Link>
              <div className="relative group">
                <button className="text-gray-700 hover:text-primary font-medium transition-colors flex items-center text-sm">
                  View Collections
                  {/* 3. Replaced SVG with Icon Component */}
                  <HiOutlineChevronDown className="w-4 h-4 ml-1" />
                </button>
              </div>
              <Link to="/products" className="text-gray-700 hover:text-primary font-medium transition-colors text-sm">Shop All</Link>
              <Link to="/faq" className="text-gray-700 hover:text-primary font-medium transition-colors text-sm">FAQ</Link>
              <Link to="/contact" className="text-gray-700 hover:text-primary font-medium transition-colors text-sm">Contact Us</Link>
            </nav>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-5">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-gray-600 hover:text-primary transition-colors p-1"
              >
                {/* 3. Replaced SVG with Icon Component */}
                <HiOutlineMagnifyingGlass size={22} strokeWidth={1.5} />
              </button>

              {userInfo ? (
                <div className="relative group">
                  <button className="text-gray-600 hover:text-primary transition-colors p-1">
                    {/* 3. Replaced SVG with Icon Component */}
                    <HiOutlineUser size={22} strokeWidth={1.5} />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 hidden group-hover:block z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{userInfo.name}</p>
                      <p className="text-xs text-gray-500">{userInfo.email}</p>
                    </div>
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Profile</Link>
                    {!userInfo.isAdmin && (
                      <Link to="/wishlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Wishlist</Link>
                    )}
                    {userInfo.isAdmin && (
                      <>
                        <div className="border-t border-gray-100 my-1"></div>
                        <Link to="/admin/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Dashboard</Link>
                        <Link to="/admin/productlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Products</Link>
                        <Link to="/admin/userlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Users</Link>
                        <Link to="/admin/orderlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Orders</Link>
                      </>
                    )}
                    <div className="border-t border-gray-100 my-1"></div>
                    <button onClick={logoutHandler} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="text-gray-600 hover:text-primary transition-colors p-1">
                  {/* 3. Replaced SVG with Icon Component */}
                  <HiOutlineUser size={22} strokeWidth={1.5} />
                </Link>
              )}

              <Link to="/cart" className="relative text-gray-600 hover:text-primary transition-colors p-1">
                {/* 3. Replaced SVG with Icon Component */}
                <HiOutlineShoppingCart size={22} strokeWidth={1.5} />
                 {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-3 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                        {cartItemCount}
                    </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Dropdown Search Box */}
      <div
        ref={searchRef}
        className={`absolute top-0 left-0 right-0 bg-background transition-all duration-300 ease-in-out z-40 ${
          isSearchOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-center">
            <div className="w-full max-w-2xl">
              <form onSubmit={searchSubmitHandler} className="relative">
                {/* 3. Replaced SVG with Icon Component */}
                <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search RakorGo"
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm text-gray-900 placeholder-gray-500"
                  autoFocus
                />
              </form>
            </div>
            <button
                onClick={() => setIsSearchOpen(false)}
                className="ml-3 p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
                {/* 3. Replaced SVG with Icon Component */}
                <HiOutlineXMark size={24} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      {/* Overlay when search is open */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-10 z-30 transition-opacity duration-300"
          onClick={() => setIsSearchOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;