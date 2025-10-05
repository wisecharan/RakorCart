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

// A reusable card component for displaying stats
const StatCard = ({ title, value }) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
  </div>
);

const DashboardScreen = () => {
  const { data: orders, isLoading: loadingOrders } = useGetOrdersQuery();
  const { data: users, isLoading: loadingUsers } = useGetUsersQuery();

  // --- Real-time Calculations ---
  const totalRevenue = orders ? orders.reduce((acc, order) => acc + order.totalPrice, 0) : 0;
  const totalOrders = orders ? orders.length : 0;
  const avgOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders) : 0;
  // Using total orders as a proxy for shipments for now
  const totalShipments = totalOrders; 

  // Format numbers for display
  const formatCurrency = (amount) => `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  // Prepare data for the chart
  const salesData = orders ? orders.reduce((acc, order) => {
    const date = new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    if (!acc[date]) { acc[date] = 0; }
    acc[date] += order.totalPrice;
    return acc;
  }, {}) : {};

  const chartData = Object.keys(salesData).map(date => ({
    date,
    Sales: salesData[date],
  })).sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="text-text-dark">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500">An overview of your store's performance.</p>
      </div>

      {loadingOrders || loadingUsers ? <p>Loading stats...</p> : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard title="Total Revenue" value={formatCurrency(totalRevenue)} />
            <StatCard title="Avg. Order Value" value={formatCurrency(avgOrderValue)} />
            <StatCard title="Total Shipments" value={totalShipments.toLocaleString('en-US')} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8">
            <h3 className="text-lg font-semibold mb-4">Transaction Activity</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} tickFormatter={(value) => `$${value/1000}K`} />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Line type="monotone" dataKey="Sales" stroke="#8884d8" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
             <h3 className="text-lg font-semibold mb-4">Customer Details</h3>
             <p className="text-gray-500">Recent customer orders will be displayed here.</p>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardScreen;