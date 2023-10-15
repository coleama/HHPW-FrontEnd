import { dbUrl } from './OrderData';

const getAllItems = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/menuItem`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});
const getSingleItem = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/menuItem/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
const getCategoryItem = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/menuItemCategory/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createItem = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/menuItem`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(async (res) => {
      let data;
      if (res.ok) {
        data = await res.json();
        resolve(data);
      }
    })
    .catch(reject);
});
const updateItem = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/menuItem/${payload.id}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(async (res) => {
      let data;
      if (res.ok) {
        data = await res.json();
        resolve(data);
      }
    })
    .catch(reject);
});
const deleteItem = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/menuItem/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});
const deleteItemFromOrder = (orderId, itemId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/MenuItemsOrder/${orderId}/${itemId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getAllItems,
  getSingleItem,
  createItem,
  updateItem,
  deleteItem,
  getCategoryItem,
  deleteItemFromOrder,
};
