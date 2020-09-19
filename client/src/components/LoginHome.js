import {
    Link,
    Route,
    Switch,
  } from 'react-router-dom';
import React, {useState, useEffect} from 'react';

const CenterStyle = {
  alignItems:'center',
  alignContent:'center',
  justifyContent:'center',
  display:'flex',
}

const LoginHomeStyle = (loggedIn) => {
  var display = "block"
  if (loggedIn === false) {
      display = "none"
  }
  return ({
    alignContent: 'center',
    margin: 5,
    padding: 5,
    color: 'black',
    textDecoration: 'none',
    backgroundColor: "cornsilk",
    outline: 'thin solid black',
    display: display
  })
}
const SignUpHomeStyle = (loggedIn) => {
  var display = "block"
  if (loggedIn === false) {
      display = "none"
  }
  return ({
    alignContent: 'center',
    margin: 5,
    padding: 5,
    color: 'black',
    textDecoration: 'none',
    backgroundColor: "orange",
    outline: 'thin solid black',
    display: display
  })
}
 
const CompStyle = {
    alignItems:'center',
    alignContent:'center',
    justifyContent:'center',
    display:'flex',
    flexDirection: 'column'
}

const ComponentStyle = {
    display: 'flex',
    flexDirection: 'column'
}

const LoggedInStyle = (loggedIn) => {
    console.log("loggedin:", loggedIn)
    var display = "none"
    if (loggedIn === true) {
        display = "block"
    }
  return ({
        display: display
    })
}

const LoginHome = ({url, display}) => {
  return (
    <div style={CompStyle}>
      <div style={CenterStyle}>
        <Link to={{pathname: '/login'}} style={LoginHomeStyle(display)}>Login</Link>{' '}
        <Link to={{pathname: '/signup'}} style={SignUpHomeStyle(display)}>Sign Up</Link>{' '}
      </div>
    </div>
    
  )};
export default LoginHome;