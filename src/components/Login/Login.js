import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import {  handleFbSignIn, handleGoogleSignIn, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';
import { Link } from 'react-router-dom';




function Login() {

  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  })

  initializeLoginFramework();

  const [logInUser, setLogInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn()
      .then(res => {
        setUser(res);
        setLogInUser(res);
        history.replace(from);
      })
  }
  const fbSignIn = () => {
    handleFbSignIn()
      .then(res => {
        setUser(res);
        setLogInUser(res);
        history.replace(from);
      })
  }


  const handleBlur = (e) => {
    console.log(e.target.name, e.target.value);
    let isFormValid = true;
    if (e.target.name === 'email') {
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFormValid = isPasswordValid && passwordHasNumber;
    }
    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }

  }
  const handleSubmit = (e) => {

    if (user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          setUser(res);
          setLogInUser(res);
          history.replace(from);
        })
    }
    e.preventDefault();
  }


  return (
    <div>
      <div style={{ width: '500px', marginLeft: '400px', border: '1px solid red' }}>
        <div style={{ marginLeft: '100px', marginTop: '25px', marginBottom: '10px' }}>
          <form onSubmit={handleSubmit}>
            <label for="email"><b>Email</b></label>
            <br />
            <input type="text" name="email" onBlur={handleBlur} placeholder="type your email" required />
            <br />
            <label for="password"><b>Password</b></label>
            <br />
            <input type="password" name="password" onBlur={handleBlur} placeholder="type your password" required />
            <br />
            <div style={{ margin: '5px', marginLeft: '15px' }}><input type="submit" value="submit" /></div>
          </form>
          <p>don't have account?<Link to="/home">create an account</Link></p>
        </div>
      </div>

      <div style={{marginLeft: '450px',marginTop:'10px'}}>
        <button onClick={googleSignIn}>sign in using google</button>
        <br />
        <button onClick={fbSignIn}>Sign in using facebook</button>

      </div>
    </div>

  );
}

export default Login;