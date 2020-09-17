import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
  } from 'react-router-dom';
import React from 'react';
import SignUpForm from './Signup'
import LoginForm from './Login'


const LoginHomeStyle = {
    alignContent: 'center',
    margin: 20,
    padding: 5,
    color: 'black',
    textDecoration: 'none',
    outline: "solid black"
}
 
const LoginHome = ({url}) => (
    <Router>
        <Link to={{pathname: '/login'}} style={LoginHomeStyle}>Login</Link>{' '}
        <Link to={{pathname: '/signup'}} style={LoginHomeStyle}>Sign Up</Link>{' '}
        <div>
        <Switch>
            <Route path="/login" component={() => <LoginForm baseUrl={url} url={url+"user/login"}/>}/>
            <Route path="/signup"component={() => <SignUpForm baseUrl={url} url={url+"user/login"}/>}/>
            </Switch>
      </div>
    </Router>
  );
export default LoginHome;