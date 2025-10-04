import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';
import { useUpdateProfileMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const ProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const [updateProfile, { isLoading: loadingUpdate }] = useUpdateProfileMutation();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({ _id: userInfo._id, name, email, password }).unwrap();
        dispatch(setCredentials(res));
        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="container mx-auto mt-10 text-text-dark grid md:grid-cols-3 gap-8">
      {/* Left Column: User Profile Form */}
      <div className="md:col-span-1">
        <h2 className="text-3xl font-bold mb-4">User Profile</h2>
        <form onSubmit={submitHandler} className="space-y-4 bg-white p-6 rounded-lg shadow-md border border-border-light">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 mt-1 bg-gray-50 border border-gray-300 rounded-md"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 mt-1 bg-gray-50 border border-gray-300 rounded-md"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input type="password" placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 mt-1 bg-gray-50 border border-gray-300 rounded-md"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
            <input type="password" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-3 py-2 mt-1 bg-gray-50 border border-gray-300 rounded-md"/>
          </div>
          <button type="submit" className="w-full py-2 font-semibold text-white bg-primary rounded-md hover:bg-primary-hover">
            {loadingUpdate ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>

      {/* Right Column: My Orders */}
      <div className="md:col-span-2">
        <h2 className="text-3xl font-bold mb-4">My Orders</h2>
        {isLoading ? (
          <p>Loading orders...</p>
        ) : error ? (
          <p className="text-red-500">{error?.data?.message || error.error}</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-border-light">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DATE</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TOTAL</th>
                  <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">PAID</th>
                  <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">DELIVERED</th>
                  <th className="py-3 px-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm">{order._id}</td>
                    <td className="py-3 px-4 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="py-3 px-4 text-sm">${order.totalPrice}</td>
                    <td className="py-3 px-4 text-center text-sm">
                      {order.isPaid ? new Date(order.paidAt).toLocaleDateString() : <FaTimes className="text-red-500 mx-auto" />}
                    </td>
                    <td className="py-3 px-4 text-center text-sm">
                      {order.isDelivered ? new Date(order.deliveredAt).toLocaleDateString() : <FaTimes className="text-red-500 mx-auto" />}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <Link to={`/order/${order._id}`}>
                        <button className="bg-gray-200 text-gray-700 text-xs py-1 px-3 rounded hover:bg-gray-300">
                          Details
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;