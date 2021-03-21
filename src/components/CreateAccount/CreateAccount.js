import React, { useContext, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from '../Login/LoginManager';

const CreateAccount = () => {
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
    const fbSignIn = () => {
        handleFbSignIn()
            .then(res => {
                setUser(res);
                setLogInUser(res);
                history.replace(from);
            })
    }

    const signOut = () => {
        handleSignOut()
            .then(res => {
                setUser(res);
                setLogInUser(res);
            })
    }





    const handleBlur = (e) => {

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
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    setUser(res);
                    setLogInUser(res);
                    history.replace(from);
                })
        }
        if (!newUser && user.email && user.password) {
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
        <div style={{ width: '500px', marginLeft: '400px', border: '1px solid red' }}>
            <div style={{ marginLeft: '100px', marginTop: '25px', marginBottom: '10px' }}>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" onBlur={handleBlur} placeholder="Your name" />
                    <br />
                    <input type="text" name="email" onBlur={handleBlur} placeholder="type your email" required />
                    <br />
                    <input type="password" name="password" onBlur={handleBlur} placeholder="type your password" required />
                    <br />
                    <input type="submit" value="submit" />
                </form>
                <p>Already have account?<Link to="/login">Login</Link></p>
            </div>
            <div style={{marginLeft: '100px'}}>
                <button onClick={googleSignIn}>sign in using google</button>
                <br />
                <button onClick={fbSignIn}>Sign in using facebook</button>

            </div>
        </div>
    );
}
export default CreateAccount;