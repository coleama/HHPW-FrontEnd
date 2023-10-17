import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { addItemsToOrder } from '../../api/OrderData';

export default function AddItemCard({ itemObj, orderObj, onUpdate }) {
  const addItems = () => {
    if (window.confirm(`AddItem ${itemObj.name} To Order`)) {
      addItemsToOrder(itemObj.id, orderObj.id).then(() => onUpdate());
    }
  };
  return (
    <>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Img variant="top" src={itemObj.imageUrl} alt={itemObj.name} style={{ height: '400px' }} />
        <Card.Body>
          <Card.Title>{itemObj.name}</Card.Title>
          <p>Description: {itemObj.description}</p>
          <p>Price: {itemObj.price}</p>
          <Link href={`/item/editItem/${itemObj.id}`} passHref>
            <Button variant="info">EDIT</Button>
          </Link>
          {orderObj.orderStatusId === 1 && (
          <Button variant="danger" onClick={addItems} className="m-2">
            ADD
          </Button>
          )}

        </Card.Body>
      </Card>
    </>
  );
}

AddItemCard.propTypes = {
  itemObj: PropTypes.shape({
    id: PropTypes.number,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,

  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  orderObj: PropTypes.shape({
    id: PropTypes.number,
    orderStatusId: PropTypes.number,
  }).isRequired,
};
