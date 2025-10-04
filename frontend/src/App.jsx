import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  const location = useLocation();
  
  // List of paths where the footer should be hidden
  const noFooterPaths = ['/login', '/register', '/forgotpassword', '/resetpassword/:resettoken', '/cart'];

  // Check if the current path is in the list
  const shouldShowFooter = !noFooterPaths.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ToastContainer />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <Outlet />
      </main>
      {/* Conditionally render the Footer */}
      {shouldShowFooter && <Footer />}
    </div>
  );
};

export default App;