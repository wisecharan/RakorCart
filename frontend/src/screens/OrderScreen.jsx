import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useDeliverOrderMutation,
} from '../slices/ordersApiSlice';

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const { data: paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPayPalClientIdQuery();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: { 'client-id': paypal.clientId, currency: 'USD' },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success('Payment successful');
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    });
  }

  function onError(err) {
    toast.error(err.message);
  }

  function createOrder(data, actions) {
    return actions.order.create({
      purchase_units: [{ amount: { value: order.totalPrice } }],
    }).then((orderId) => {
      return orderId;
    });
  }

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success('Order marked as delivered');
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : error ? (
    <p className="text-red-500">{error?.data?.message || error.error}</p>
  ) : (
    <div className="container mx-auto mt-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Order {order._id}</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Shipping</h2>
            <p><strong>Name: </strong> {order.user.name}</p>
            <p><strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
            <p><strong>Address: </strong>{order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
            {order.isDelivered ? (
              <p className="mt-4 p-2 bg-green-700 rounded">Delivered on {order.deliveredAt}</p>
            ) : (
              <p className="mt-4 p-2 bg-red-700 rounded">Not Delivered</p>
            )}
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
            <p><strong>Method: </strong> {order.paymentMethod}</p>
            {order.isPaid ? (
              <p className="mt-4 p-2 bg-green-700 rounded">Paid on {order.paidAt}</p>
            ) : (
              <p className="mt-4 p-2 bg-red-700 rounded">Not Paid</p>
            )}
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.orderItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center"><img src={item.image} alt={item.name} className="w-12 h-12 rounded mr-4" /><Link to={`/product/${item.product}`} className="hover:underline">{item.name}</Link></div>
                  <div>{item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="bg-gray-800 p-6 rounded-lg h-fit">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between"><p>Items:</p> <p>${order.itemsPrice}</p></div>
            <div className="flex justify-between"><p>Shipping:</p> <p>${order.shippingPrice}</p></div>
            <div className="flex justify-between"><p>Tax:</p> <p>${order.taxPrice}</p></div>
            <div className="flex justify-between font-bold text-lg border-t border-gray-700 pt-2 mt-2"><p>Total:</p> <p>${order.totalPrice}</p></div>
          </div>
          {!order.isPaid && (
            <div className="mt-4">
              {loadingPay && <p>Loading Payment...</p>}
              {isPending ? (<p>Loading PayPal...</p>) : (
                <div><PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError}></PayPalButtons></div>
              )}
            </div>
          )}
          {loadingDeliver && <p>Loading...</p>}
          {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
            <div className="mt-4">
              <button type="button" className="w-full bg-green-600 font-bold py-3 rounded-lg hover:bg-green-700" onClick={deliverOrderHandler}>
                Mark As Delivered
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;