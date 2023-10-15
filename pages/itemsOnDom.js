/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'animate.css';
import { getAllItems } from '../api/ItemData';
import ItemCard from '../components/cards/itemCard';

export default function ItemsOnDom() {
  const [items, setItems] = useState([]);

  const getAllProducts = () => {
    getAllItems().then(setItems);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="animate__animated animate__bounceInDown">
      <div className="text-center my-4">
        <div className="d-flex flex-wrap">
          {items.map((item) => (
            <ItemCard key={item.id} itemObj={item} onUpdate={getAllProducts} />
          ))}
        </div>

      </div>
    </div>
  );
}
