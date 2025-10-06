import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
} from '../slices/ordersApiSlice';

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const { data: paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPayPalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = () => {
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

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-6">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">{error?.data?.message || error.error}</p>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-semibold text-gray-900 mb-4 tracking-tight">Order Details</h1>
              <p className="text-gray-600">Order ID: {order._id}</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Order Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Shipping Info */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Shipping</h2>
                  <div className="space-y-2 text-gray-600">
                    <p><strong>Name:</strong> {order.user ? order.user.name : 'Guest'}</p>
                    <p><strong>Email:</strong> {order.user ? order.user.email : order.shippingAddress.email}</p>
                    <p><strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
                  </div>
                  
                  {/* Delivery Status */}
                  <div className={`mt-4 p-3 rounded-lg font-medium text-sm ${
                    order.deliveryStatus === 'Delivered' ? 'bg-green-100 text-green-800' 
                    : order.deliveryStatus === 'Shipping' ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                  }`}>
                    Status: {order.deliveryStatus}
                    {order.deliveryStatus === 'Delivered' && ` on ${new Date(order.deliveredAt).toLocaleDateString()}`}
                  </div>
                </div>

                {/* Payment Info */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Payment</h2>
                  <p className="text-gray-600 mb-4"><strong>Method:</strong> {order.paymentMethod}</p>
                  {order.isPaid ? (
                    <div className="p-3 bg-green-100 text-green-800 rounded-lg">
                      Paid on {new Date(order.paidAt).toLocaleDateString()}
                    </div>
                  ) : (
                    <div className="p-3 bg-gray-100 text-gray-800 rounded-lg">
                      Not Paid
                    </div>
                  )}
                </div>

                {/* Order Items */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Order Items</h2>
                  <div className="space-y-4">
                    {order.orderItems.map((item, index) => (
                      <div key={index} className="flex justify-between items-center border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                        <div className="flex items-center">
                          <img src={item.image} alt={item.name} className="w-16 h-16 object-contain rounded-lg mr-4" />
                          <Link to={`/product/${item.product}`} className="font-medium text-gray-900 hover:text-gray-700 transition-colors">
                            {item.name}
                          </Link>
                        </div>
                        <div className="text-gray-900 font-medium">
                          {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl p-6 border border-gray-200 sticky top-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-100">Order Summary</h2>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <p className="text-gray-600">Items:</p>
                      <p className="font-semibold text-gray-900">${order.itemsPrice}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-600">Shipping:</p>
                      <p className="font-semibold text-gray-900">${order.shippingPrice}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-600">Tax:</p>
                      <p className="font-semibold text-gray-900">${order.taxPrice}</p>
                    </div>
                    {order.discountPrice > 0 && (
                      <div className="flex justify-between text-green-600">
                        <p>Discount:</p>
                        <p className="font-semibold">-${order.discountPrice.toFixed(2)}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between font-semibold text-xl border-t border-gray-100 pt-4 mb-6">
                    <p className="text-gray-900">Total:</p>
                    <p className="text-gray-900">${order.totalPrice}</p>
                  </div>
                  
                  {/* PayPal Payment */}
                  {!order.isPaid && (
                    <div className="mt-6">
                      {loadingPay && <p className="text-gray-600 text-center">Loading Payment...</p>}
                      {isPending ? (
                        <p className="text-gray-600 text-center">Loading PayPal...</p>
                      ) : (
                        <div>
                          <PayPalButtons 
                            createOrder={createOrder} 
                            onApprove={onApprove} 
                            onError={onError}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderScreen;