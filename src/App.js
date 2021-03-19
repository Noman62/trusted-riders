import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import BookingVehicles from './components/BookingVehicles/BookingVehicles';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext=createContext();

function App() {
  const [logInUser,setLogInUser]=useState({});
  return (
    <UserContext.Provider value={[logInUser,setLogInUser]} >
    <Router>
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <PrivateRoute path="/vehiclesInfo/:id">
          <BookingVehicles />
        </PrivateRoute>
        <Route path="/login">
        <Login/>
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
