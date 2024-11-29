import { useContext } from 'react';
import { cartContext } from '../Context/CartContext';

function Orders() {
  const { orderItems } = useContext(cartContext);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-5">Orders</h2>
      {orderItems.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {orderItems.map((order) => 
            order.map((product) => (
              <div key={product?.id} className="flex flex-row items-center justify-between bg-white shadow-lg rounded-lg p-4">
                <div className="w-32 h-32">
                  <img src={product?.image} alt={product?.name} className="w-full h-full object-cover rounded-sm" />
                </div>
                <div className="flex-grow pl-4">
                  <p className="font-bold text-xl text-gray-800">{product?.name}</p>
                  <p className="text-lg text-gray-600">${product?.price}</p>
                  <p className="text-sm text-gray-500">{product?.description}</p><br/>
                  <p className="text-sm text-gray-500">Quantity :{product.quantity}</p>
                </div>
                
              </div>
            ))
          )}
        </div>
      ) : (
        <p>No Orders Found</p>
      )}
    </div>
  );
}

export default Orders;
