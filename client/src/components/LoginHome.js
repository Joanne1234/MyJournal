import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
  } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import SignUpForm from './Signup'
import LoginForm from './Login'
import { ViewMoods, MoodForm } from './Mood';
import { ViewPet } from './Pet';
import {ViewReflections, ReflectionInput } from './Reflection';
import {ViewJournals,ViewJournal,JournalInput} from './Journal'
import Home from './Home'

const CenterStyle = {
  alignItems:'center',
  alignContent:'center',
  justifyContent:'center',
  display:'flex',
}

const LoginHomeStyle = (display) => {
  console.log("display,", display)
  if (!display) {
    display = "block"
  }
  return ({
    alignContent: 'center',
    margin: 5,
    padding: 5,
    color: 'black',
    textDecoration: 'none',
    backgroundColor: "cornsilk",
    outline: 'thin solid black'
  })
}
const SignUpHomeStyle = (display) => {
  if (!display) {
    display = "block"
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

const LoginHome = ({url}) => {
  const [display, setDisplay] = useState("block")
  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(() => {
    if (loggedIn == true) {
      setDisplay("none")
      console.log("loggedin...")
    }
}, [loggedIn])
  return (
    <div style={CompStyle}>
      <div style={CenterStyle}>
        <Link to={{pathname: '/login'}} style={LoginHomeStyle(display)}>Login</Link>{' '}
        <Link to={{pathname: '/signup'}} style={SignUpHomeStyle(display)}>Sign Up</Link>{' '}
      </div>
        <Switch>
            <Route path="/login" component={() => <LoginForm baseUrl={url} url={url+"user/login"} setLoggedIn={setLoggedIn}/>}/>
            <Route path="/signup"component={() => <SignUpForm baseUrl={url} url={url+"user/signup"} setLoggedIn={setLoggedIn}/>}/>
            <Route exact path="/home" component={() => <Home url={url}/>}/>
        </Switch>
      </div>
  )};
export default LoginHome;