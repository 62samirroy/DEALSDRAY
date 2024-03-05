import React, { useState } from 'react';
import './EmployeeForm.css';
import Navbar from './Navbar';

const EmployeeForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [designation, setDesignation] = useState('');
  const [gender, setGender] = useState('');
  const [courses, setCourses] = useState([]);
  const [img, setImage] = useState(''); // Modified to store the image URL
  const [error, setError] = useState('');
  const [message, setmessage] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/employee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          mobile,
          designation,
          gender,
          courses,
          img, // Use the state variable directly
        }),
      });
      const data = await response.json();
      if (data.success) {
        setmessage('Employee added successfully');
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error adding employee');
    }
  };

  return (
    <>
    <Navbar/>
    <div className='firstdiv'>
    <div className="employee-form-container">
      <h2 >Employee Form</h2>
      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}
      <form onSubmit={handleFormSubmit}>
        {/* Form fields for adding employee data */}
        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Mobile No:</label>
          <input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} pattern="[0-9]{10}" required />
        </div>
        <div className="form-group">
          <label>Designation:</label>
          <select value={designation} onChange={(e) => setDesignation(e.target.value)} required>
            <option value="">Select Designation</option>
            <option value="Manager">Manager</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
          </select>
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <div>
            <label><input type="radio" name="gender" value="Male" onChange={(e) => setGender(e.target.value)} required /> Male</label>
            <label><input type="radio" name="gender" value="Female" onChange={(e) => setGender(e.target.value)} required /> Female</label>
          </div>
        </div>
        <div className="form-group">
          <label>Course:</label>
          <div>
            <label><input type="checkbox" value="HTML" onChange={(e) => setCourses([...courses, e.target.value])} /> HTML</label>
            <label><input type="checkbox" value="CSS" onChange={(e) => setCourses([...courses, e.target.value])} /> CSS</label>
            <label><input type="checkbox" value="JavaScript" onChange={(e) => setCourses([...courses, e.target.value])} /> JavaScript</label>
          </div>
        </div>
        <div className="form-group">
          <label>Image URL:</label> {/* Modified label for image URL input */}
          <input type="text" value={img} onChange={(e) => setImage(e.target.value)} required />
        </div>
        {/* Your form fields go here */}
        <button className='button' type="submit">Submit</button>
      </form>
    </div>
    </div>
    </>
  );
};

export default EmployeeForm;
