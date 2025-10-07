import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimes, FaEye, FaBox, FaShippingFast, FaCheckCircle } from 'react-icons/fa';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';

const MyOrdersScreen = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered':
        return <FaCheckCircle className="text-green-500" size={16} />;
      case 'Shipping':
        return <FaShippingFast className="text-yellow-500" size={16} />;
      case 'Pending':
        return <FaBox className="text-red-500" size={16} />;
      default:
        return <FaBox className="text-gray-500" size={16} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-50 text-green-700 border border-green-200';
      case 'Shipping':
        return 'bg-yellow-50 text-yellow-700 border border-yellow-200';
      case 'Pending':
        return 'bg-red-50 text-red-700 border border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Order History</h2>
            <p className="text-gray-600 mt-1">Track and manage your orders</p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span className="bg-gray-100 px-3 py-1 rounded-full">{orders?.length || 0} orders</span>
          </div>
        </div>
      </div>
      
      {/* Content */}
      {isLoading ? (
        <div className="flex justify-center items-center py-16">
          <div className="flex flex-col items-center space-y-3">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
            <p className="text-gray-600 text-sm">Loading your orders...</p>
          </div>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaTimes className="text-red-500 text-xl" />
          </div>
          <p className="text-gray-700 font-medium mb-2">Unable to load orders</p>
          <p className="text-gray-600 text-sm">{error?.data?.message || error.error}</p>
        </div>
      ) : orders && orders.length > 0 ? (
        <div className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Order ID</th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total</th>
                  <th className="py-4 px-6 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Payment</th>
                  <th className="py-4 px-6 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="py-4 px-6 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="py-4 px-6">
                      <div className="text-sm font-medium text-gray-900 font-mono">
                        #{order._id.substring(0, 8)}...
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm font-semibold text-gray-900">
                        ${order.totalPrice.toFixed(2)}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      {order.isPaid ? (
                        <div className="flex flex-col items-center">
                          <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">
                            Paid
                          </span>
                          <span className="text-xs text-gray-500 mt-1">
                            {new Date(order.paidAt).toLocaleDateString()}
                          </span>
                        </div>
                      ) : (
                        <div className="flex justify-center">
                          <span className="inline-flex items-center text-xs text-red-600 font-medium bg-red-50 px-3 py-1 rounded-full">
                            <FaTimes className="mr-1" size={10} />
                            Pending
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.deliveryStatus)}`}>
                        {getStatusIcon(order.deliveryStatus)}
                        <span className="ml-2">{order.deliveryStatus}</span>
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link to={`/order/${order._id}`}>
                        <button className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors duration-200 hover:bg-gray-100 px-3 py-2 rounded-lg">
                          <FaEye className="mr-2" size={14} />
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
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaBox className="text-gray-400 text-2xl" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders yet</h3>
          <p className="text-gray-600 mb-6 max-w-sm mx-auto">You haven't placed any orders. Start shopping to see your order history here.</p>
          <Link to="/">
            <button className="bg-gray-900 text-white font-medium py-3 px-6 rounded-xl hover:bg-gray-800 transition-colors duration-200">
              Start Shopping
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyOrdersScreen;