import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteItemFromOrder } from '../../api/ItemData';

export default function RemoveItemCard({ itemObj, orderObj, onUpdate }) {
  const removeItems = () => {
    if (window.confirm(`Remove Item ${itemObj.name} To Order`)) {
      deleteItemFromOrder(orderObj.id, itemObj.id).then(() => onUpdate());
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
          <Button variant="danger" onClick={removeItems} className="m-2">
            Remove
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}

RemoveItemCard.propTypes = {
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
  }).isRequired,
};
