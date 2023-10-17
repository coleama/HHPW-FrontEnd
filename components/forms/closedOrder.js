import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { updateOrder } from '../../api/OrderData';
import { getAllPaymentTypes, getAllStatus } from '../../api/miscData';

const initialState = {
  orderStatusId: '',
  paymentTypeId: '',
  tip: '',
};

export default function CloseOrderForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [payment, setPayment] = useState([]);
  const [status, setStatus] = useState([]);
  const router = useRouter();
  useEffect(() => {
    if (obj.id) setFormInput(obj);
    getAllPaymentTypes().then(setPayment);
    getAllStatus().then(setStatus);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateOrder(formInput)
      .then(() => router.push('/OrdersOnDom'));
  };
  console.warn(obj, 'this');
  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Order</h2>
      <Row className="mb-3">
        <Form.Group className="mb-3" controlId="formGridLevel">
          <Form.Select
            aria-label="Payment"
            name="paymentTypeId"
            onChange={handleChange}
            className="mb-3"
            value={obj.paymentTypeId}
          >
            <option value="">Select a Payment Type</option>
            {
            payment.map((types) => (
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
      </Row>
      <Row className="mb-3">
        <Form.Group className="mb-3" controlId="formGridLevel">
          <Form.Select
            aria-label="Status"
            name="orderStatusId"
            onChange={handleChange}
            className="mb-3"
            value={obj.orderStatusId}
            required
          >
            <option value="">Select Closed if Closing</option>
            {
            status.map((types) => (
              <option
                key={types.id}
                value={types.id}
              >
                {types.status}
              </option>
            ))
          }
          </Form.Select>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridContent">
          <Form.Label>Enter Tip</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Tip"
            name="tip"
            value={formInput.tip}
            onChange={handleChange}
            required
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridContent">
          <Form.Label>Enter 1-5 bad to good</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter 1-5"
            name="starNumberId"
            value={formInput.starNumberId}
            onChange={handleChange}
            required
          />
        </Form.Group>
      </Row>
      <Button type="submit">{obj.id ? 'Update' : 'Create'} Order</Button>
    </Form>
  );
}

CloseOrderForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    paymentTypeId: PropTypes.number,
    orderStatusId: PropTypes.number,
    tip: PropTypes.number,
    starNumberId: PropTypes.number,
  }),
};
CloseOrderForm.defaultProps = {
  obj: initialState,
};
