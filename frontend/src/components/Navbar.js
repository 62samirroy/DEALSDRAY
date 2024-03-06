import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

import './Navbar.css';

const Navbar = ({setLoggedIn}) => {
  const navigate = useNavigate(); // Initialize navigate function
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Retrieve username from localStorage
    const storedUsername = localStorage.getItem('username');
    console.log(storedUsername);
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    // Clear local storage
    localStorage.clear();
    // Redirect to login page
    setLoggedIn(false)
    navigate('/'); // Redirect to the home page
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        {/* Left side */}
        <div className="navbar-left">
          {/* Logo */}
          <img src="/my.jpg" alt="Logo" className="logo" />
          {/* Home/Employees List */}
          <nav>
            <ul  className="nav-links">
              <li><Link to="/dashboard">Home</Link></li>
              <li><Link to="/employeelist">Employee List</Link></li>
            </ul>
          </nav>
        </div>
        {/* Right side */}
        <div className="navbar-right">
          {/* User Name */}
          <span className="username">{username}</span>
          {/* Logout Button */}
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
