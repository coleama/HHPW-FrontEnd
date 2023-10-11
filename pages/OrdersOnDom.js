/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'animate.css';
import { getAllOrders } from '../api/OrderData';
import OrderCard from '../components/cards/OrderCard';

export default function OrdersOnDom() {
  const [orders, setOrders] = useState([]);

  const getAllOrder = () => {
    getAllOrders().then(setOrders);
  };

  useEffect(() => {
    getAllOrder();
  }, []);

  return (
    <div className="animate__animated animate__bounceInDown">
      <div className="text-center my-4">
        <div className="d-flex flex-wrap">
          {orders.map((order) => (
            <OrderCard key={order.id} orderObj={order} onUpdate={getAllOrder} />
          ))}
        </div>

      </div>
    </div>
  );
}
