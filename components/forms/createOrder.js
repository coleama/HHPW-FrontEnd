import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { createOrder, updateOrder } from '../../api/OrderData';
import { getAllOrderTypes } from '../../api/miscData';

const initialState = {
  customerName: '',
  customerPhoneNumber: '',
};

export default function OrderForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [type, setType] = useState([]);
  const router = useRouter();
  useEffect(() => {
    if (obj.id) {
      setFormInput(obj);
    }
    getAllOrderTypes().then(setType);
  }, [obj]);
  console.warn(obj, 'this');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      updateOrder(formInput)
        .then(() => router.push('/'));
    } else {
      const payload = {
        ...formInput, datePlaced: new Date(Date.now()), orderStatusId: 1, userId: 1, tip: 0.0, paymentTypeId: 1,
      };
      createOrder(payload).then(() => {
        router.push('/');
      });
    }
    console.warn(type);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Order</h2>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCharName">
          <Form.Label>Customer Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            name="customerName"
            value={formInput.customerName}
            onChange={handleChange}
            required
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridContent">
          <Form.Label>Customer Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Phone Number"
            name="customerPhoneNumber"
            value={formInput.customerPhoneNumber}
            onChange={handleChange}
            required
          />
        </Form.Group>
      </Row>
      <Form.Group className="mb-3" controlId="formGridLevel">
        <Form.Select
          aria-label="Category"
          name="orderTypeId"
          onChange={handleChange}
          className="mb-3"
          value={obj.orderTypeId}
        >
          <option value="">Select a Order Type</option>
          {
            type.map((types) => (
              <option
                key={types.id}
                value={types.id}
              >
                {types.type}
              </option>
            ))
          }
        </Form.Select>
      </Form.Group>
      <Button type="submit">{obj.id ? 'Update' : 'Create'} Order</Button>
    </Form>
  );
}

OrderForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    customerName: PropTypes.string,
    customerPhoneNumber: PropTypes.string,
    orderTypeId: PropTypes.number,
  }),
};
OrderForm.defaultProps = {
  obj: initialState,
};
