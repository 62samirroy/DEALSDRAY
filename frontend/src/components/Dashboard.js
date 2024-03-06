// Dashboard.js

import React, { useEffect, useState } from 'react';
import './Dashboard.css'; // Import CSS file for styling
import Navbar from './Navbar';

const Dashboard =() => {
  // Function to handle logout
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Retrieve username from localStorage
    const storedUsername = localStorage.getItem('username');
    console.log(storedUsername);
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div>
      {/* Welcome message */}
      <div className="welcome-message">
        <h2>Welcome {username}</h2>
      </div>

      {/* Main Content */}
      {/* Your main content goes here */}
      {/* For example, display some statistics, charts, or any other content */}
    </div>
  );
};

export default Dashboard;
