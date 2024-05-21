import React from 'react';
import { useDrag } from 'react-dnd';
import './PropertyCard.css';
import { UserOutlined, CloseCircleOutlined } from '@ant-design/icons';

const PropertyCard = ({ property, onDelete }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'PROPERTY',
        item: { id: property._id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    return (
        <div className="property-card" ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
            <div className="top">
            <h4>{property.propertyName}</h4>
            <CloseCircleOutlined onClick={() => onDelete(property._id)} style={{ color: 'gray', fontSize: '20px', position: 'relative', top: '0px', right: '10px', cursor: 'pointer' }} />
            </div>
           
             <div className="bottom">
                <UserOutlined style={{
                    fontSize: '20px', borderRadius: '50%',
                    padding: '10px',
                    backgroundColor: '#808080',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }} />
                <p>{property.address}</p>
            </div>
            
        </div>
    );
};

export default PropertyCard;