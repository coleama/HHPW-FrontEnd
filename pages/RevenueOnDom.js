/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import { getAllOrders } from '../api/OrderData';

export default function ViewRevenue() {
  const [orderData, setOrderData] = useState([]);
  useEffect(() => {
    getAllOrders().then(setOrderData);
  }, []);
  console.warn(orderData);
  const closedOrders = orderData.filter((order) => order.orderStatusId === 2);
  const totalPrice = closedOrders.reduce((total, order) => {
    const itemsPrice = order.items.reduce((total, item) => total + item.price, 0);
    return total + itemsPrice;
  }, 0);
  const totalTip = closedOrders.reduce((total, order) => total + order.tip, 0);
  const counts = {
    1: 0,
    2: 0,
    3: 0,
  };
  const payments = {
    1: 0,
    2: 0,
    3: 0,
  };
  const reviews = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };
  closedOrders.forEach((order) => {
    payments[order.paymentTypeId] += 1;
  });
  closedOrders.forEach((order) => {
    counts[order.orderTypeId] += 1;
  });
  closedOrders.forEach((order) => {
    reviews[order.starNumberId] += 1;
  });
  console.warn(orderData);
  const totalMoney = totalPrice + totalTip;
  return (
    <>
      <div>
        <h2>Closed Orders Summary</h2>
        <p>Total Sales: ${totalPrice}</p>
        <p>Total Tip: ${totalTip}</p>
        <p>Total Profit: ${totalMoney}</p>
        <p>Order Type Counts:</p>
        <ul>
          <li>In Person: {counts[1]}</li>
          <li>Online: {counts[2]}</li>
          <li>Phone: {counts[3]}</li>
        </ul>
        <p>Payment Type Counts:</p>
        <ul>
          <li>Cash: {counts[1]}</li>
          <li>Credit Card: {counts[2]}</li>
          <li>Apple Pay: {counts[3]}</li>
        </ul>
        <p>Review Type Counts:</p>
        <ul>
          <li>bad: {reviews[1]}</li>
          <li>okay: {reviews[2]}</li>
          <li>good: {reviews[3]}</li>
          <li>great: {reviews[4]}</li>
          <li>best: {reviews[5]}</li>
        </ul>
      </div>
    </>
  );
}
