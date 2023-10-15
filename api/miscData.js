import { dbUrl } from './OrderData';

const getAllStatus = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/orderStatus`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});
const getAllPaymentTypes = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/paymentType`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});
const getAllOrderTypes = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/orderType`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});
const getAllCategories = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/category`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});
export {
  getAllOrderTypes,
  getAllPaymentTypes,
  getAllStatus,
  getAllCategories,
};
