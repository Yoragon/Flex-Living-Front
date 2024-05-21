import React, { useState } from 'react';
import './AddProperty.css';
import { PlusCircleOutlined } from '@ant-design/icons';

const AddProperty = ({ addProperty }) => {
  const [newProperty, setNewProperty] = useState({
    _id: '',
    address: '',
    propertyName: '',
    group: 'Full Property List',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProperty((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProperty(newProperty);
    setNewProperty({
      _id: '',
      address: '',
      propertyName: '',
      group: 'Full Property List',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
      className='add-property-input'
        type="text"
        name="_id"
        placeholder="ID"
        value={newProperty._id}
        onChange={handleChange}
        required
      />
      <input
       className='add-property-input'
        type="text"
        name="address"
        placeholder="Address"
        value={newProperty.address}
        onChange={handleChange}
        required
      />
      <input
       className='add-property-input'
        type="text"
        name="propertyName"
        placeholder="Property Name"
        value={newProperty.propertyName}
        onChange={handleChange}
        required
      />
      <button type="submit">ADD PROPERTY <PlusCircleOutlined /></button>
    </form>
  );
};

export default AddProperty;