import { dbUrl } from './OrderData';

const getItemComments = (itemId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/menuItemComments/${itemId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getCommentById = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/comment/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createComment = (payload, postId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/itemComments/${postId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        resolve(data);
      }
    })
    .catch(reject);
});

const updateComment = (payload, id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/comment/${id}`, {
    method: 'PUT',
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

const deleteComment = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/comment/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  createComment,
  updateComment,
  deleteComment,
  getCommentById,
  getItemComments,
};
