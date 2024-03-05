// server.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const loginRoutes = require('./routes/loginRoutes');
const employeeRoutes =require('./routes/EmployeeRout')


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Add this line to enable CORS
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://DealsDray:DealsDray@cluster0.qmhltui.mongodb.net/DealsDray?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

  
  
// Routes
app.use('/api/employee', employeeRoutes); // Use employeeRoutes for handling employee-related requests
app.use('/api/login', loginRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


