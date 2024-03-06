import React, { useState, useEffect } from 'react';
import './EmployeeList.css'; // Import CSS file for styling
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const EmployeeList = ({ setOneUser }) => {
  const [employees, setEmployees] = useState([]); // State to store employee data
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [sortOrder, setSortOrder] = useState('asc'); // State for sorting order

  // Function to toggle sorting order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  // Fetch employee data from backend API
  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/employee');
      const data = await response.json();
      setEmployees(data); // Set the employee data in state
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    fetchEmployees(); // Fetch employees on component mount
  }, []);

  // Function to handle search filter
  const filteredEmployees = employees.filter(employee =>
    (employee.username && employee.username.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (employee.email && employee.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (employee._id && employee._id.toString().includes(searchTerm.toLowerCase()))
  );

  // Function to handle sorting
  const sortedEmployees = filteredEmployees.sort((a, b) => {
    const nameA = a.username ? a.username.toLowerCase() : '';
    const nameB = b.username ? b.username.toLowerCase() : '';

    if (sortOrder === 'asc') {
      return nameA.localeCompare(nameB);
    } else {
      return nameB.localeCompare(nameA);
    }
  });

  // Function to handle employee deletion
  const handleDeleteEmployee = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/employee/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete employee');
      }

      // Remove the deleted employee from the state
      setEmployees(employees.filter(employee => employee._id !== id));
      console.log(employees.img);

    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <>
      <div className="employee-list-container">
        {/* Search Filter */}
        <div className='scaech'>
          <div className='scaech1'>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

          </div>
        </div>
        {/* Table */}
        <table>
          <thead>
            <tr>
              <th onClick={toggleSortOrder}>Name</th>
              <th>Unique Id</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedEmployees.map(employee => (
              <tr key={employee._id}>
                <td>{employee.username}</td>
                <td>{employee._id}</td>
                <td>{employee.email}</td>
                <td>{employee.mobile}</td>
                <td>{employee.designation}</td>
                <td>{employee.gender}</td>
                <td>{employee.courses}</td>
                <td><img className="employee-image" src={employee.img} alt="Employee" /></td>
                <td>
                <Link   className="link" to={`/employeeedit/${employee._id}`} onClick={() => setOneUser(employee)}>
                <button>Edit</button>
              </Link>
                  <button className='delete-button' onClick={() => handleDeleteEmployee(employee._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='buttondiv'>
          <Link className="link" to="/EmployeeForm">
            <button className='button1'>Create employee</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default EmployeeList;
