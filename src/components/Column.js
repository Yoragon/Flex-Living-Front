import React from 'react';
import { useDrop } from 'react-dnd';
import PropertyCard from './PropertyCard';
import './Column.css';

const Column = ({ title, properties, updatePropertyGroup, group, onDelete }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'PROPERTY',
    drop: (item) => updatePropertyGroup(item.id, group),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div className="column" ref={drop} style={{ backgroundColor: isOver ? '#f0f0f0' : 'white' }}>
      <h2>{title}</h2>
      <div className="cards">
      {properties.map((property) => (
        <PropertyCard key={property._id} property={property} onDelete={onDelete} />
      ))}
      </div>
    </div>
  );
};

export default Column;