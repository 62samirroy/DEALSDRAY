// routes/loginRoutes.js
const express = require('express');
const router = express.Router();
const { User } = require('../models/models'); // Import User and Employee from the models object

// Login route
router.post('/', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      res.json({ success: true, user, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid login details' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

 // Add employee route
// router.post('/:slug', async (req, res) => {
//   const { username, email, mobile, designation, gender, course, img } = req.body;

//   try {
//     const newEmployee = new Employee({
//       username,
//       email,
//       mobile,
//       designation,
//       gender,
//       course,
//       img,
//     });
//     const savedEmployee = await newEmployee.save();
//     res.json({ success: true, message: 'Employee added successfully', employee: savedEmployee });
//   } catch (err) {
//     console.error('Error:', err);
//     res.status(500).json({ success: false, message: 'Server Error' });
//   }
// });

module.exports = router;
