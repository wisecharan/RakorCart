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
    <div className="container mx-auto mt-10 text-white grid md:grid-cols-3 gap-8">
      {/* Left Column: User Profile Form */}
      <div className="md:col-span-1">
        <h2 className="text-3xl font-bold mb-4">User Profile</h2>
        <form onSubmit={submitHandler} className="space-y-4 bg-gray-800 p-6 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-300">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <input type="password" placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Confirm Password</label>
            <input type="password" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md"/>
          </div>
          <button type="submit" className="w-full py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700">
            {loadingUpdate ? 'Updating...' : 'Update'}
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
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800">
              <thead>
                <tr className="bg-gray-700">
                  <th className="py-2 px-4 text-left">ID</th>
                  <th className="py-2 px-4 text-left">DATE</th>
                  <th className="py-2 px-4 text-left">TOTAL</th>
                  <th className="py-2 px-4 text-left">PAID</th>
                  <th className="py-2 px-4 text-left">DELIVERED</th>
                  <th className="py-2 px-4"></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b border-gray-700 hover:bg-gray-700">
                    <td className="py-2 px-4">{order._id}</td>
                    <td className="py-2 px-4">{order.createdAt.substring(0, 10)}</td>
                    <td className="py-2 px-4">${order.totalPrice}</td>
                    <td className="py-2 px-4 text-center">
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <FaTimes className="text-red-500 mx-auto" />
                      )}
                    </td>
                    <td className="py-2 px-4 text-center">
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <FaTimes className="text-red-500 mx-auto" />
                      )}
                    </td>
                    <td className="py-2 px-4">
                      <Link to={`/order/${order._id}`}>
                        <button className="bg-gray-600 text-white text-sm py-1 px-2 rounded hover:bg-gray-500">
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