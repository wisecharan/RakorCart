import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-4 text-white">Orders</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error?.data?.message || error.error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 text-white">
            <thead>
              <tr className="bg-gray-700">
                <th className="py-2 px-4 text-left">ID</th>
                <th className="py-2 px-4 text-left">USER</th>
                <th className="py-2 px-4 text-left">DATE</th>
                <th className="py-2 px-4 text-left">TOTAL</th>
                <th className="py-2 px-4 text-center">PAID</th>
                <th className="py-2 px-4 text-center">DELIVERED</th>
                <th className="py-2 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b border-gray-700 hover:bg-gray-700">
                  <td className="py-2 px-4">{order._id}</td>
                  <td className="py-2 px-4">{order.user && order.user.name}</td>
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
  );
};

export default OrderListScreen;