import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteOrder } from '../../api/OrderData';

export default function OrderCard({ orderObj, onUpdate }) {
  const deleteThisOrder = () => {
    if (window.confirm(`Delete ${orderObj.customerName} and their members`)) {
      deleteOrder(orderObj.id).then(() => onUpdate());
    }
  };
  return (
    <>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Body>
          <Card.Title>{orderObj.customerName}</Card.Title>
          <div className="d-grid gap-2">
            <Link href={`/order/${orderObj.id}`} passHref>
              <Button variant="primary" className="m-2">VIEW</Button>
            </Link>
          </div>
          <div className="d-grid gap-2">
            <Link href={`/order/editOrder/${orderObj.id}`} passHref>
              <Button variant="info">EDIT</Button>
            </Link>
          </div>
          <br />
          <div className="d-grid gap-2">
            {orderObj.orderStatusId === 1 && (
              <Link href={`/order/closeOrder/${orderObj.id}`} passHref>
                <Button variant="info">CLOSE</Button>
              </Link>
            )}
          </div>
          <Button variant="danger" onClick={deleteThisOrder} className="m-2">
            DELETE
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}

OrderCard.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number,
    customerName: PropTypes.string,
    orderStatusId: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
