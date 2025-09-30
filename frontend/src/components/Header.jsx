import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logout } from '../slices/authSlice';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="bg-gray-800 text-white shadow-lg">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white hover:text-gray-300">
          Apple Store
        </Link>
        <div className="flex items-center space-x-4">
          {/* User Info Dropdown */}
          {userInfo ? (
            <div className="relative group">
              <button className="font-semibold p-2 rounded-md bg-gray-700">
                {userInfo.name}
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg py-1 hidden group-hover:block z-10">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600"
                >
                  Profile
                </Link>
                <button
                  onClick={logoutHandler}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-600"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="font-semibold p-2 hover:text-gray-300">
              <i className="fas fa-user"></i> Sign In
            </Link>
          )}

          {/* Admin Menu Dropdown */}
          {userInfo && userInfo.isAdmin && (
            <div className="relative group">
              <button className="font-semibold p-2 rounded-md bg-gray-700">Admin</button>
              <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg py-1 hidden group-hover:block z-10">
                <Link to="/admin/productlist" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600">
                  Products
                </Link>
                <Link to="/admin/userlist" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600">
                  Users
                </Link>
                <Link to="/admin/orderlist" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600">
                  Orders
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;