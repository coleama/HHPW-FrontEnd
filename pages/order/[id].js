/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getAllItemsOnOrder } from '../../api/OrderData';
import ItemCard from '../../components/cards/itemCard';

export default function ViewOrder() {
  const router = useRouter();
  const { id } = router.query;
  const [orderData, setOrderData] = useState({});

  useEffect(() => {
    getAllItemsOnOrder(id).then(setOrderData);
  }, [id]);
  console.warn(orderData);

  const itemsArray = orderData.map((order) => order.items?.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    imageUrl: item.imageUrl,
    description: item.description,
  }))).flat();
  function calculateTotal(orderData) {
    const itemPrices = itemsArray.reduce((acc, item) => acc + item.price, 0);
    const total = itemPrices + (orderData.tip || 0);
    return total;
  }
  console.warn(itemsArray);

  return (
    <>
      {orderData.map((order) => (
        <div key={order.id} className="text-white ms-5 details">
          <h1>Order Name: {order.customerName}</h1>
          <h4>Phone: {order.customerPhoneNumber}</h4>
          <p>Status: {order.orderStatusId === 1 ? 'Open' : 'Closed' }</p>
          <p>Type: {order.orderTypeId === 1 ? 'In Person' : order.orderTypeId === 2 ? 'Online' : order.orderTypeId === 3 ? 'Phone' : 'Unknown'}</p>
          <p>Tip: {order.tip}</p>
          <p>Total: {calculateTotal(order)}</p>

        </div>
      ))}
      <div className="d-flex flex-wrap">
        {itemsArray?.map((item) => (
          <ItemCard key={item.id} itemObj={item} onUpdate={getAllItemsOnOrder} />
        ))}
      </div>
    </>
  );
}
