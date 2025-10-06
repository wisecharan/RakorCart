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
        setPassword('');
        setConfirmPassword('');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-semibold text-gray-900 mb-4 tracking-tight">My Profile</h1>
            <p className="text-gray-600 text-lg">Manage your account and view order history</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Profile Settings</h2>
                <form onSubmit={submitHandler} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input 
                      type="text" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                    <input 
                      type="password" 
                      placeholder="Enter new password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                    <input 
                      type="password" 
                      placeholder="Confirm new password" 
                      value={confirmPassword} 
                      onChange={(e) => setConfirmPassword(e.target.value)} 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={loadingUpdate}
                    className="w-full bg-gray-900 text-white font-medium py-4 px-6 rounded-xl hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    {loadingUpdate ? 'Updating...' : 'Update Profile'}
                  </button>
                </form>
              </div>
            </div>

            {/* Order History */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-2xl font-semibold text-gray-900">Order History</h2>
                </div>
                
                {isLoading ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                  </div>
                ) : error ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600">{error?.data?.message || error.error}</p>
                  </div>
                ) : orders && orders.length > 0 ? (
                  <div className="overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                            <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                            <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Paid</th>
                            <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Delivered</th>
                            <th className="py-4 px-6 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {orders.map((order) => (
                            <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                              <td className="py-4 px-6 text-sm text-gray-900 font-medium">
                                {order._id.substring(0, 8)}...
                              </td>
                              <td className="py-4 px-6 text-sm text-gray-600">
                                {new Date(order.createdAt).toLocaleDateString()}
                              </td>
                              <td className="py-4 px-6 text-sm text-gray-900 font-medium">
                                ${order.totalPrice}
                              </td>
                              <td className="py-4 px-6 text-center text-sm">
                                {order.isPaid ? (
                                  <span className="text-green-600 font-medium">
                                    {new Date(order.paidAt).toLocaleDateString()}
                                  </span>
                                ) : (
                                  <FaTimes className="text-red-500 mx-auto" size={14} />
                                )}
                              </td>
                              <td className="py-4 px-6 text-center text-sm">
                                {order.isDelivered ? (
                                  <span className="text-green-600 font-medium">
                                    {new Date(order.deliveredAt).toLocaleDateString()}
                                  </span>
                                ) : (
                                  <FaTimes className="text-red-500 mx-auto" size={14} />
                                )}
                              </td>
                              <td className="py-4 px-6 text-right text-sm">
                                <Link to={`/order/${order._id}`}>
                                  <button className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors">
                                    View Details
                                  </button>
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <p className="text-gray-600 mb-4">No orders yet</p>
                    <Link 
                      to="/products" 
                      className="inline-block bg-gray-900 text-white font-medium py-3 px-6 rounded-xl hover:bg-gray-800 transition-colors"
                    >
                      Start Shopping
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;