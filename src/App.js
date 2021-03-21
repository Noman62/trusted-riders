import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import BookingVehicles from './components/BookingVehicles/BookingVehicles';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import CreateAccount from './components/CreateAccount/CreateAccount';


export const UserContext=createContext();

function App() {
  const [logInUser,setLogInUser]=useState({});
  return (
    <UserContext.Provider value={[logInUser,setLogInUser]} >
   <Router >
      <Header/>
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <PrivateRoute path="/book">
          <BookingVehicles/>
        </PrivateRoute>
        <PrivateRoute path="/vehiclesInfo/:name">
          <BookingVehicles />
        </PrivateRoute>
        <Route path="/login">
        <Login/>
        </Route>
        <Route path="/create">
          <CreateAccount/>
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
