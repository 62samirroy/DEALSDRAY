// backend/routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const { Employee } = require('../models/models'); // Assuming your model is named User

// Add employee route
router.post('/', async (req, res) => {
  // Extracting data from request body
  const { username, email, mobile, designation, gender, courses,img} = req.body;
  // Validate form data
 

  console.log(username);
  if (!username || !email || !mobile || !designation || !gender || !courses|| !img) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const newEmployee = new Employee({
      username,
      email,
      mobile,
      designation,
      gender,
      courses,
      img
    });
    // Save the employee data to MongoDB
    const savedEmployee = await newEmployee.save();
    console.log('Employee data:', savedEmployee); // Print the saved employee data
    res.json({ success: true, message: 'Employee added successfully', employee: savedEmployee });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find(); // Retrieve all employees from MongoDB
    res.json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Fetch employee by ID
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    console.error('Error fetching employee by ID:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Update employee by ID
router.put('/:id', async (req, res) => {
  try {
    const { username, email, mobile, designation, gender, courses, img } = req.body;
    console.log(req.body);
    const updatedEmployee = {
      username,
      email,
      mobile,
      designation,
      gender,
      courses,
      img
    };
    const employee = await Employee.findByIdAndUpdate(req.params.id, updatedEmployee, { new: true });
    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }
    res.json({ success: true, message: 'Employee updated successfully', employee });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});
// Delete an employee
router.delete('/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }
    res.json({ success: true, message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});
module.exports = router;
