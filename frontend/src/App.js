import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import EmployeeForm from './components/EmployeeForm';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import EmployeeList from './components/EmployeeList';
import EmployeeEdit from './components/EmployeeEdit';
import { MongoDataProvider } from './MongoDataContext';
import Navbar from './components/Navbar';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false); // State to track login status
  const [userData, setUserData] = useState(null);
  const [oneUser, setOneUser] = useState();
  return (
    <Router>
      <MongoDataProvider>

         {/* <Navbar user={userData} /> */}
        <Switch>
          {/* Define routes */}
          <Route exact path="/">
            {/* If logged in, redirect to dashboard; otherwise, show login */}
            {loggedIn ? <Dashboard userdata={userData} /> : <Login setLoggedIn={setLoggedIn} setUserData={setUserData} />}
          </Route>

          <Route path="/dashboard">
            {/* If not logged in, redirect to login; otherwise, show dashboard */}
            {loggedIn ? <Dashboard /> : <Redirect to="/" />}
          </Route>
          <Route path="/EmployeeForm" component={EmployeeForm} />
          <Route path="/EmployeeList" render={() => <EmployeeList setOneUser={setOneUser} />} />
          <Route path="/EmployeeEdit/:id" render={(props) => <EmployeeEdit {...props} oneUser={props} />} />
          
        </Switch>
      </MongoDataProvider>
    </Router>
  );
};

export default App;
