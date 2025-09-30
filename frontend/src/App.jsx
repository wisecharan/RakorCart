import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header'; // Import the Header

const App = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Header /> {/* Add the Header here */}
      <ToastContainer />
      <main className="container mx-auto py-3">
        {/* The Outlet is where your routed pages will be rendered */}
        <Outlet />
      </main>
    </div>
  );
};

export default App;