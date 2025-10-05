import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.auth);

  // Paths where footer should not be displayed
  const noFooterPaths = [
    '/login',
    '/register',
    '/forgotpassword',
    '/resetpassword/:resettoken',
    '/cart',
    '/shipping',
    '/payment',
    '/placeorder',
    '/profile',
  ];

  // Normalize dynamic routes like /resetpassword/xyz to /resetpassword/:resettoken
  const isNoFooterPath = noFooterPaths.some((path) => {
    if (path.includes(':')) {
      const [base] = path.split('/:');
      return location.pathname.startsWith(base);
    }
    return location.pathname === path;
  });

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      navigate('/admin/dashboard');
    }
  }, [userInfo, navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ToastContainer />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <Outlet />
      </main>
      {!isNoFooterPath && <Footer />}
    </div>
  );
};

export default App;
