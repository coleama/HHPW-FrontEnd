/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ItemForm from '../../../components/forms/createItem';
import { getSingleItem } from '../../../api/ItemData';

export default function EditItem() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleItem(id).then(setEditItem);
  }, [id]);
  console.warn(editItem);
  return (<ItemForm obj={editItem} />);
}
