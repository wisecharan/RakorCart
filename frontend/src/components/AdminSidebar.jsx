import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { clearCart } from '../slices/cartSlice';
import { 
  FaTachometerAlt, 
  FaBoxOpen, 
  FaClipboardList, 
  FaUsers,
  FaSignOutAlt,
  FaTag, // For Categories
  FaChartLine, // For Sales/Analytics
  FaBell, // For Notifications
  FaCog, // For Settings
  FaChevronDown, // For dropdown indicator
} from 'react-icons/fa';
import { useState } from 'react'; // Import useState for dropdown

const AdminSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();
  const [productsOpen, setProductsOpen] = useState(true); // State for Products dropdown

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(clearCart());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  const activeLink = 'flex items-center p-3 rounded-lg bg-primary text-white transition-colors';
  const normalLink = 'flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors';
  const subLink = 'flex items-center py-2 px-3 pl-8 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors';
  const activeSubLink = 'flex items-center py-2 px-3 pl-8 bg-gray-100 text-primary rounded-lg transition-colors';

  return (
    <aside className="w-64 bg-white shadow-lg p-4 h-screen sticky top-0 flex flex-col justify-between">
  <div>
    <div className="text-2xl font-bold text-primary mb-10 text-left">
      RakorGo Admin
    </div>

        <nav className="space-y-2 font-medium">
          <NavLink to="/admin/dashboard" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
            <FaTachometerAlt className="mr-3" />
            Dashboard
          </NavLink>

          {/* Products Dropdown */}
          <div>
            <button 
              onClick={() => setProductsOpen(!productsOpen)} 
              className={`w-full flex items-center justify-between p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors ${productsOpen ? 'bg-gray-100' : ''}`}
            >
              <div className="flex items-center">
                <FaBoxOpen className="mr-3" />
                Products
              </div>
              <FaChevronDown className={`transform transition-transform ${productsOpen ? 'rotate-180' : 'rotate-0'}`} />
            </button>
            {productsOpen && (
              <div className="ml-4 mt-1 space-y-1">
                <NavLink to="/admin/productlist" className={({ isActive }) => (isActive ? activeSubLink : subLink)}>
                  Product List
                </NavLink>
                <NavLink to="/admin/categories" className={({ isActive }) => (isActive ? activeSubLink : subLink)}>
                  Categories
                </NavLink>
              </div>
            )}
          </div>
          
          <NavLink to="/admin/orderlist" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
            <FaClipboardList className="mr-3" />
            Orders
          </NavLink>
          <NavLink to="/admin/userlist" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
            <FaUsers className="mr-3" />
            Users
          </NavLink>
          <NavLink to="/admin/sales" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
            <FaChartLine className="mr-3" />
            Sales
          </NavLink>
          <NavLink to="/admin/notifications" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
            <FaBell className="mr-3" />
            Notifications
          </NavLink>
          <NavLink to="/admin/settings" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
            <FaCog className="mr-3" />
            Settings
          </NavLink>
        </nav>
      </div>
      <div>
        <button onClick={logoutHandler} className="w-full flex items-center p-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors font-medium">
          <FaSignOutAlt className="mr-3" />
          Log out
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;