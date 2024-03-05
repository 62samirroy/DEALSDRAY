import React, { createContext, useState, useEffect } from 'react';

const MongoDataContext = createContext();

const MongoDataProvider = ({ children }) => {
  const [mongoData, setMongoData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/employee'); // Adjust the URL according to your backend route
        const data = await response.json();
        setMongoData(data);
      } catch (error) {
        console.error('Error fetching data from MongoDB:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <MongoDataContext.Provider value={mongoData}>
      {children}
    </MongoDataContext.Provider>
  );
};

export { MongoDataProvider, MongoDataContext };
