import { useGetOrdersQuery } from '../../slices/ordersApiSlice';
import { useGetUsersQuery } from '../../slices/usersApiSlice';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const DashboardScreen = () => {
  const { data: orders, isLoading: loadingOrders } = useGetOrdersQuery();
  const { data: users, isLoading: loadingUsers } = useGetUsersQuery();

  // Calculate stats
  const totalSales = orders
    ? orders.reduce((acc, order) => acc + order.totalPrice, 0)
    : 0;
  const totalOrders = orders ? orders.length : 0;
  const totalUsers = users ? users.length : 0;
  
  // Prepare data for the chart (sales per day)
  const salesData = orders ? orders.reduce((acc, order) => {
    const date = new Date(order.createdAt).toLocaleDateString('en-US');
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += order.totalPrice;
    return acc;
  }, {}) : {};

  const chartData = Object.keys(salesData).map(date => ({
    date,
    sales: salesData[date],
  })).sort((a, b) => new Date(a.date) - new Date(b.date));


  return (
    <div className="container mx-auto px-4 py-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {loadingOrders || loadingUsers ? <p>Loading stats...</p> : (
        <>
          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-400">Total Sales</h3>
              <p className="text-3xl font-bold mt-2">${totalSales.toFixed(2)}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-400">Total Orders</h3>
              <p className="text-3xl font-bold mt-2">{totalOrders}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-400">Total Users</h3>
              <p className="text-3xl font-bold mt-2">{totalUsers}</p>
            </div>
          </div>

          {/* Sales Chart */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Sales Over Time</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                <XAxis dataKey="date" stroke="#A0AEC0" />
                <YAxis stroke="#A0AEC0" />
                <Tooltip contentStyle={{ backgroundColor: '#2D3748', border: 'none' }} />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#4299E1" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardScreen; 