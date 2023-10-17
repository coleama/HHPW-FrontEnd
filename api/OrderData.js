const dbUrl = 'https://localhost:7095';
const getAllOrders = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});
const getSingleOrder = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/orders/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
const createOrder = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/orders`, {
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
const updateOrder = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/orders/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
const deleteOrder = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/orders/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});
const getAllItemsOnOrder = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/orderItems/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});
const addItemsToOrder = (itemId, orderId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/MenuItemsOrder/${itemId}/${orderId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  createOrder,
  updateOrder,
  getAllOrders,
  getSingleOrder,
  dbUrl,
  deleteOrder,
  getAllItemsOnOrder,
  addItemsToOrder,
};
