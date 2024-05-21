import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Column from './components/Column';
import Filter from './components/Filter';
import AddProperty from './components/AddProperty';
import './App.css';
import { notification } from 'antd';

function App() {
  const [properties, setProperties] = useState([]);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/properties')
      .then(response => response.json())
      .then(data => setProperties(data.properties)); // Access the nested properties array
  }, []);

  // Function to handle property deletion
  const deleteProperty = (id) => {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow"
    };
    
    fetch(`http://localhost:3001/delete-property/${id}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete the property.');
        }
        return response.text();
      })
      .then((result) => {
        setProperties(prevProperties => prevProperties.filter(property => property._id !== id));
        notification.success({
          message: 'Success',
          description: 'Property has been successfully deleted.',
          duration: 2,
        });
      })
      .catch((error) => {
        console.error(error);
        notification.error({
          message: 'Error',
          description: 'There was an error deleting the property.',
          duration: 2,
        });
      });
  };

  //drag & drop
  const updatePropertyGroup = (id, newGroup) => {
   fetch(`http://localhost:3001/update-property/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ group: newGroup }),
    })
    .then(response => {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json();
      } else {
        return response.text();
      }
    })
    .then(data => {
      
        setProperties(prevProperties =>
          prevProperties.map(property =>
            property._id === id ? { ...property, group: newGroup } : property
          )
        ); // Log the plain text response
     
    })
    .catch(error => console.error('Error:', error));
  };




  const addProperty = async (newProperty) => {
    // Adding the new property using the API
    try {
      const response = await fetch('http://localhost:3001/add-property/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProperty),
      });
      if (!response.ok) {
        if (response.status === 400) {
          notification.error({
            message: 'Erreur',
            description: "The property ID already exists.",
            duration: 2,
          });
        } else {
          notification.error({
            message: 'Erreur',
            description: 'An error occurred while adding the property.',
            duration: 2,
          });
          throw new Error('Network response was not ok');
        }
      }
      const updatedProperties = await fetch('http://localhost:3001/properties')
        .then(res => res.json())
        .then(data => data.properties);
      setProperties(updatedProperties);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const filteredProperties = properties.filter(property =>
    property.propertyName.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <>
    <div class="splash-screen">
        <img className="logo" src="logo.png" alt="Logo"/>
        <div className="top-half"></div>
        <div className="bottom-half"></div>
    </div>
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Filter filterText={filterText} setFilterText={setFilterText} />
        <AddProperty addProperty={addProperty} />
        <div className="columns">
          <Column
            title="Cleanings Required"
            properties={filteredProperties.filter(property => property.group === 'Exited')}
            updatePropertyGroup={updatePropertyGroup}
            onDelete={deleteProperty}
            group="Exited"
          />
          <Column
            title="Cleanings Pending"
            properties={filteredProperties.filter(property => property.group === 'Pending')}
            updatePropertyGroup={updatePropertyGroup}
            onDelete={deleteProperty}
            group="Pending"
          />
          <Column
            title="Cleanings Done"
            properties={filteredProperties.filter(property => property.group === 'Full Property List')}
            updatePropertyGroup={updatePropertyGroup}
            onDelete={deleteProperty}
            group="Full Property List"
          />
        </div>
      </div>
    </DndProvider>
    </>
  );
}

export default App;