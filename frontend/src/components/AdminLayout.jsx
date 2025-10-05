import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 text-text-dark">
      <AdminSidebar />
      <main className="flex-grow p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;