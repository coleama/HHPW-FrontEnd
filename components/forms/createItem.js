import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { createItem, updateItem } from '../../api/ItemData';
import { getAllCategories } from '../../api/miscData';

const initialState = {
  Name: '',
  Description: '',
  ImageUrl: '',
  Price: '',
};

export default function ItemForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [type, setType] = useState([]);
  const router = useRouter();
  useEffect(() => {
    if (obj.id) {
      setFormInput(obj);
    }
    getAllCategories().then(setType);
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
      updateItem(formInput)
        .then(() => router.push('/'));
    } else {
      const payload = {
        ...formInput,
      };
      createItem(payload).then(() => {
        router.push('/');
      });
    }
    console.warn(type);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Item</h2>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCharName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            name="Name"
            value={formInput.Name}
            onChange={handleChange}
            required
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridContent">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Description"
            name="Description"
            value={formInput.Description}
            onChange={handleChange}
            required
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridContent">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Price"
            name="Price"
            value={formInput.Price}
            onChange={handleChange}
            required
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridContent">
          <Form.Label>Image Url</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Link"
            name="ImageUrl"
            value={formInput.ImageUrl}
            onChange={handleChange}
            required
          />
        </Form.Group>
      </Row>
      <Form.Group className="mb-3" controlId="formGridLevel">
        <Form.Select
          aria-label="Category"
          name="MenuCategoryId"
          onChange={handleChange}
          className="mb-3"
          value={obj.MenuCategoryId}
        >
          <option value="">Select a Category Type</option>
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
      <Button type="submit">{obj.id ? 'Update' : 'Create'} Item</Button>
    </Form>
  );
}

ItemForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    Name: PropTypes.string,
    Description: PropTypes.string,
    Price: PropTypes.number,
    MenuCategoryId: PropTypes.number,
  }),
};
ItemForm.defaultProps = {
  obj: initialState,
};
