import React, { useContext, useState, useEffect } from 'react';
import { MongoDataContext } from '../MongoDataContext'; // Import the MongoDataContext
import './EmployeeEdit.css'; // Import CSS file
import Navbar from './Navbar';

const EmployeeEdit = ({ oneUser }) => {
  const mongoData = useContext(MongoDataContext);
  const [employeeData, setEmployeeData] = useState({
    username: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    courses: [],
    img: null
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (mongoData.length > 0) {
      const index = mongoData.findIndex(item => item._id === oneUser.match.params.id);
      const firstItem = mongoData[index];
      setEmployeeData({
        username: firstItem.username,
        email: firstItem.email,
        mobile: firstItem.mobile,
        designation: firstItem.designation,
        gender: firstItem.gender,
        courses: firstItem.courses,
        img: firstItem.img
      });
    }
  }, [mongoData, oneUser.match.params.id]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const index = mongoData.findIndex(item => item._id === oneUser.match.params.id);
      const response = await fetch(`http://localhost:5000/api/employee/${mongoData[index]._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: employeeData.username,
          email: employeeData.email,
          mobile: employeeData.mobile,
          designation: employeeData.designation,
          gender: employeeData.gender,
          courses: employeeData.courses,
          img: employeeData.img,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error updating employee');
      }
      setSuccess('Employee updated successfully');
    } catch (error) {
      console.error('Error updating employee:', error);
      setError(error.message || 'Error updating employee');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <>
    <Navbar/>
    <div className='firstdiv'>
    <div className="employee-form-container">
      <h2>Edit Employee</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="username" value={employeeData.username} onChange={handleChange} required />
        </div>
        {/* Other form fields */}
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={employeeData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Mobile No:</label>
          <input type="tel" name="mobile" value={employeeData.mobile} onChange={handleChange} pattern="[0-9]{10}" required />
        </div>
        <div className="form-group">
          <label>Designation:</label>
          <select name="designation" value={employeeData.designation} onChange={handleChange} required>
            <option value="">Select Designation</option>
            <option value="Manager">Manager</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
          </select>
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <div>
            <label><input type="radio" name="gender" value="Male" checked={employeeData.gender === 'Male'} onChange={handleChange} required /> Male</label>
            <label><input type="radio" name="gender" value="Female" checked={employeeData.gender === 'Female'} onChange={handleChange} required /> Female</label>
          </div>
        </div>
        <div className="form-group">
          <label>Course:</label>
          <div>
            <label><input type="checkbox" name="courses" value="HTML" checked={employeeData.courses.includes('HTML')} onChange={handleChange} /> HTML</label>
            <label><input type="checkbox" name="courses" value="CSS" checked={employeeData.courses.includes('CSS')} onChange={handleChange} /> CSS</label>
            <label><input type="checkbox" name="courses" value="JavaScript" checked={employeeData.courses.includes('JavaScript')} onChange={handleChange} /> JavaScript</label>
          </div>
        </div>
        <div className="form-group">
          <label>Image Upload:</label>
          <input type="text" name="img" value={employeeData.img} accept=".jpg, .jpeg, .png" onChange={handleChange} />
        </div>
        <button className="button" type="submit">Submit</button>
      </form>
    </div>
    </div>
    </>
  );
};

export default EmployeeEdit;
