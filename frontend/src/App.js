import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import EmployeeEdit from './components/EmployeeEdit';
import Navbar from './components/Navbar';
import { MongoDataProvider } from './MongoDataContext';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false); // State to track login status
  const [userData, setUserData] = useState(null);
  const [oneUser, setOneUser] = useState(null);
  return (
    <Router>
      <MongoDataProvider>
      <div>
        {loggedIn?<Navbar setLoggedIn={setLoggedIn} />:<Login setLoggedIn={setLoggedIn} setUserData={setUserData}/>}
        <Routes>
           <Route exact path="/" element={loggedIn?<Dashboard/>:<Login setLoggedIn={setLoggedIn} setUserData={setUserData}  />} />
          <Route path="/dashboard" element={<Dashboard userdata={userData} />} />
          <Route path="/employeeform" element={<EmployeeForm />} />
          <Route path="/employeelist" element={<EmployeeList setOneUser={setOneUser}/>} />
          <Route path="/employeeedit/:id" element={<EmployeeEdit oneUser={oneUser}/>} />
        </Routes>
      </div>
      </MongoDataProvider>
    </Router>
  );
};

export default App;
