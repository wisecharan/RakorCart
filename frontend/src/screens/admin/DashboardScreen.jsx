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
  const totalSales = orders ? orders.reduce((acc, order) => acc + order.totalPrice, 0) : 0;
  const totalOrders = orders ? orders.length : 0;
  const totalUsers = users ? users.length : 0;
  
  // Prepare data for the chart (sales per day)
  const salesData = orders ? orders.reduce((acc, order) => {
    const date = new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += order.totalPrice;
    return acc;
  }, {}) : {};

  const chartData = Object.keys(salesData).map(date => ({
    date,
    Sales: salesData[date],
  })).sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="container mx-auto px-4 py-8 text-text-dark">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {loadingOrders || loadingUsers ? <p>Loading stats...</p> : (
        <>
          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-border-light">
              <h3 className="text-lg font-semibold text-gray-500">Total Sales</h3>
              <p className="text-4xl font-bold mt-2">${totalSales.toFixed(2)}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-border-light">
              <h3 className="text-lg font-semibold text-gray-500">Total Orders</h3>
              <p className="text-4xl font-bold mt-2">{totalOrders}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-border-light">
              <h3 className="text-lg font-semibold text-gray-500">Total Users</h3>
              <p className="text-4xl font-bold mt-2">{totalUsers}</p>
            </div>
          </div>

          {/* Sales Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-border-light">
            <h3 className="text-xl font-semibold mb-4">Sales Over Time</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0D8CC" />
                <XAxis dataKey="date" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D8CC' }} />
                <Legend />
                <Line type="monotone" dataKey="Sales" stroke="#6B5B4B" strokeWidth={2} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardScreen;