import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import 'animate.css';
import { getAllItems } from '../api/ItemData';
import ItemCard from '../components/cards/itemCard';

export default function ItemsOnDom() {
  const [allItems, setAllItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    getAllItems().then((items) => {
      setAllItems(items);
    });
  }, []);

  const filterItemsByCategory = (menuCategoryId) => {
    setSelectedCategory(menuCategoryId);
  };

  const filteredItems = selectedCategory
    ? allItems.filter((item) => item.menuCategoryId === selectedCategory)
    : allItems;

  return (
    <div className="animate__animated animate__bounceInDown">
      <div className="text-center my-4">
        <div className="d-flex justify-content-between mb-2">
          <Button onClick={() => filterItemsByCategory(1)}>Category 1</Button>
          <Button onClick={() => filterItemsByCategory(2)}>Category 2</Button>
          <Button onClick={() => filterItemsByCategory(3)}>Category 3</Button>
        </div>
        <div className="d-flex flex-wrap">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} itemObj={item} onUpdate={() => {}} />
          ))}
        </div>
      </div>
    </div>
  );
}
