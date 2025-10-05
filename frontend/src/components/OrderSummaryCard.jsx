import { useSelector } from 'react-redux';
import { formatCurrency } from '../utils/formatters';

const OrderSummaryCard = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice } = cart;

  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Order</h2>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item._id} className="flex justify-between items-center text-sm">
            <div className="flex items-center">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4 border" />
              <div>
                <p className="font-medium text-gray-800">{item.name}</p>
                <p className="text-gray-500">Qty: {item.qty}</p>
              </div>
            </div>
            <p className="font-medium text-gray-800">{formatCurrency(item.price * item.qty)}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t space-y-2 text-sm">
        <div className="flex justify-between">
          <p className="text-gray-600">Subtotal</p>
          <p className="font-medium">{formatCurrency(itemsPrice)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Shipping cost</p>
          <p className="font-medium">{formatCurrency(shippingPrice)}</p>
        </div>
         <div className="flex justify-between">
          <p className="text-gray-600">Tax</p>
          <p className="font-medium">{formatCurrency(taxPrice)}</p>
        </div>
        <div className="flex justify-between font-bold text-lg border-t pt-4 mt-2">
          <p>Grand total</p>
          <p>{formatCurrency(totalPrice)}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryCard;