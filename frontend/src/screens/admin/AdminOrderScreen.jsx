import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  useGetOrderDetailsQuery,
  useUpdateOrderStatusMutation,
} from '../../slices/ordersApiSlice';

const AdminOrderScreen = () => {
  const { id: orderId } = useParams();
  const { data: order, isLoading, error, refetch } = useGetOrderDetailsQuery(orderId);
  
  const [status, setStatus] = useState('');
  const [updateOrderStatus, { isLoading: loadingUpdate }] = useUpdateOrderStatusMutation();

  useEffect(() => {
    if (order) {
      setStatus(order.deliveryStatus);
    }
  }, [order]);

  const statusUpdateHandler = async () => {
    try {
      await updateOrderStatus({ orderId, status });
      refetch();
      toast.success('Order status updated');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const formatCurrency = (amount) => `$${Number(amount).toFixed(2)}`;

  return isLoading ? <p>Loading...</p> : error ? <p className="text-red-500">{error?.data?.message || error.error}</p> : (
    <>
      <Link to="/admin/orderlist" className="inline-block mb-6 text-primary font-semibold hover:underline">
        &larr; Back to Orders
      </Link>
      <h1 className="text-3xl font-bold mb-6 text-text-dark">Order Details</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md border border-border-light">
            <h2 className="text-2xl font-bold mb-4">Shipping</h2>
            <p><strong>Name: </strong> {order.user ? order.user.name : 'Guest'}</p>
            <p><strong>Email: </strong> {order.user ? <a href={`mailto:${order.user.email}`} className="text-primary hover:underline">{order.user.email}</a> : order.shippingAddress.email}</p>
            <p><strong>Address: </strong>{order.shippingAddress.address}, {order.shippingAddress.city}{' '}{order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-border-light">
            <h2 className="text-2xl font-bold mb-4">Payment & Delivery</h2>
            <p><strong>Payment Method: </strong> {order.paymentMethod}</p>
            {order.isPaid ? ( <p className="mt-2 p-2 bg-green-100 text-green-800 rounded-md text-sm font-medium">Paid on {new Date(order.paidAt).toLocaleDateString()}</p> ) : ( <p className="mt-2 p-2 bg-red-100 text-red-800 rounded-md text-sm font-medium">Not Paid</p> )}
            <div className={`mt-4 p-2 rounded-md font-medium text-sm ${
              order.deliveryStatus === 'Delivered' ? 'bg-green-100 text-green-800' 
              : order.deliveryStatus === 'Shipping' ? 'bg-yellow-100 text-yellow-800'
              : 'bg-gray-100 text-gray-800'
            }`}>
              Status: {order.deliveryStatus}
              {order.deliveryStatus === 'Delivered' && ` on ${new Date(order.deliveredAt).toLocaleDateString()}`}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-border-light">
            <h2 className="text-2xl font-bold mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.orderItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center border-b border-border-light pb-2 last:border-b-0">
                  <div className="flex items-center">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded mr-4" />
                    <Link to={`/product/${item.product}`} className="hover:underline font-semibold">{item.name}</Link>
                  </div>
                  <div className="text-gray-700">{item.qty} x {formatCurrency(item.price)} = {formatCurrency(item.qty * item.price)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md h-fit sticky top-24 border border-border-light">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 text-gray-700 border-b border-border-light pb-4">
              <div className="flex justify-between"><p>Items:</p> <p className="font-semibold">{formatCurrency(order.itemsPrice)}</p></div>
              <div className="flex justify-between"><p>Shipping:</p> <p className="font-semibold">{formatCurrency(order.shippingPrice)}</p></div>
              <div className="flex justify-between"><p>Tax:</p> <p className="font-semibold">{formatCurrency(order.taxPrice)}</p></div>
              {order.discountPrice > 0 && (
                <div className="flex justify-between text-green-600"><p>Discount:</p><p className="font-semibold">-{formatCurrency(order.discountPrice)}</p></div>
              )}
            </div>
            <div className="flex justify-between font-bold text-xl pt-4"><p>Total:</p> <p>{formatCurrency(order.totalPrice)}</p></div>

            {order.isPaid && (
              <div className="mt-6 border-t pt-4">
                <h3 className="text-lg font-bold mb-2">Update Status</h3>
                <div className="flex items-center space-x-2">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full p-2 bg-gray-50 border border-gray-300 rounded-md"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipping">Shipping</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                  <button
                    onClick={statusUpdateHandler}
                    className="py-2 px-4 bg-primary text-white font-semibold rounded-md hover:bg-primary-hover"
                    disabled={loadingUpdate}
                  >
                    Update
                  </button>
                </div>
                {loadingUpdate && <p className="text-sm mt-2">Updating...</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminOrderScreen;