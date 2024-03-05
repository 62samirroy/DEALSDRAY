// Login.js

import React, { useState, useEffect } from 'react';
import './Login.css'; // Import CSS file
import Dashboard from './Dashboard';

const Login = ({ setLoggedIn, setUserData }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Check local storage for authentication status upon component mount
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      setLoggedIn(true);
    }
  }, [setLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      console.log(data.user.username);
      if (data.success) {
        // Store username in localStorage
        localStorage.setItem('username', data.user.username);
        // Set authentication status in local storage
        localStorage.setItem('isLoggedIn', 'true');
        // Update authentication state in App component
        setUserData(data.user.username); // Set the user data
        setLoggedIn(true);
      } else {
        setError('Invalid login details');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error logging in');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
