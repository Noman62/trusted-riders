import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';



function Login() {
  const [newUser, setNewUser] = useState(false);
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
  const fbSignIn=()=>{
    handleFbSignIn()
    .then(res => {
      setUser(res);
      setLogInUser(res);
      history.replace(from);
    })
  }

  const signOut=()=>{
    handleSignOut()
    .then(res=>{
      setUser(res);
      setLogInUser(res);
    })
  }





  const handleBlur = (e) => {
    console.log(e.target.name, e.target.value);
    let isFormValid = true;
    if (e.target.name === 'email') {
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
      //console.log(isEmailValid);
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
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name,user.email,user.password)
      .then(res=>{
        setUser(res);
        setLogInUser(res);
        history.replace(from);
      })
    }
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email,user.password)
      .then(res=>{
        setUser(res);
        setLogInUser(res);
        history.replace(from);
      })
    }
    e.preventDefault();
  }


  return (
    <div style={{ textAlign: 'center' }}>
      {
        user.isSignIn ? <button onClick={signOut}>sign out</button> : <button onClick={googleSignIn}>sign in</button>
      }
      <br />
      <button onClick={fbSignIn}>Sign in using facebook</button>

      {
        user.isSignIn && <div>
          <p>Welcome,{user.name}</p>
          <p>your email:{user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }
      <br />
      <input type="checkbox" name="newUser" onChange={() => setNewUser(!newUser)} id="" />
      <label htmlFor="newUser">New user Sign up</label>
      <form onSubmit={handleSubmit}>
        {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Your name" />}
        <br />
        <input type="text" name="email" onBlur={handleBlur} placeholder="type your email" required />
        <br />
        <input type="password" name="password" onBlur={handleBlur} placeholder="type your password" required />
        <br />
        <input type="submit" value="submit" />
      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      {user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Login'} successfully</p>}
    </div>
  );
}

export default Login;