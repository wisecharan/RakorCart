import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <div className="container mx-auto px-4 text-text-dark">
      <h1 className="text-3xl font-bold my-6">All Orders</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error?.data?.message || error.error}</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-border-light">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">USER</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">DATE</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">TOTAL</th>
                <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase">PAID</th>
                <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase">DELIVERED</th>
                <th className="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-medium">{order._id}</td>
                  <td className="py-3 px-4 text-sm">{order.user && order.user.name}</td>
                  <td className="py-3 px-4 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-4 text-sm">${order.totalPrice}</td>
                  <td className="py-3 px-4 text-center text-sm">
                    {order.isPaid ? new Date(order.paidAt).toLocaleDateString() : <FaTimes className="text-red-500 mx-auto" />}
                  </td>
                  <td className="py-3 px-4 text-center text-sm">
                    {order.isDelivered ? new Date(order.deliveredAt).toLocaleDateString() : <FaTimes className="text-red-500 mx-auto" />}
                  </td>
                  <td className="py-3 px-4 text-right">
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
  );
};

export default OrderListScreen;