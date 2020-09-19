import {
    Link,
    Route,
    Switch,
  } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import SignUpForm from './Signup'
import LoginForm from './Login'
import { ViewMoods, MoodForm } from './Mood';
import { ViewPet, ViewPetSimple } from './Pet';
import {ViewReflections, ReflectionInput } from './Reflection';
import {ViewJournals,JournalInput} from './Journal'
import Home from './Home'

const CenterStyle = {
  alignItems:'center',
  alignContent:'center',
  justifyContent:'center',
  display:'flex',
}

const LoginHomeStyle = (display) => {
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
    outline: 'thin solid black',
    display: display
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

const ComponentStyle = {
  display: 'flex',
  flexDirection: 'column'
}

const LoginHome = ({url}) => {
  const [display, setDisplay] = useState("block")
  const [loggedIn, setLoggedIn] = useState(false)
  const [change, setUserChange] = useState(false)
  const pathname='/home'
  useEffect(() => {
    console.log("changed", change)
  }, [change])
  useEffect(() => {
    if (loggedIn === true) {
      setDisplay("none")

    } else {
      setDisplay("block")
    }
}, [loggedIn])
  return (
    <div style={CompStyle}>
      <div style={CenterStyle}>
        <Link to={{pathname: '/login'}} style={LoginHomeStyle(display)}>Login</Link>{' '}
        <Link to={{pathname: '/signup'}} style={SignUpHomeStyle(display)}>Sign Up</Link>{' '}
      </div>
      <div style={ComponentStyle}>
        <Switch>
            <Route path="/login" component={() => <LoginForm baseUrl={url} url={url+"user/login"} setLoggedIn={setLoggedIn}/>}/>
            <Route path="/signup"component={() => <SignUpForm baseUrl={url} url={url+"user/signup"} setLoggedIn={setLoggedIn}/>}/>
            <Route exact path="/home" component={() => <Home url={url} pathname="/home" setLoggedIn={setLoggedIn}/>}/>
            <Route path={pathname+"/pet"} component={() => <ViewPetSimple petUrl={url+"pet"}/>}/>
            <Route path={pathname+"/feedpet"} component={() => <ViewPet petUrl={url+"pet"} setUserChange={setUserChange}/>}/>
            <Route path={pathname+"/journals"} component={() => <ViewJournals journalUrl={url+"journal"} setUserChange={setUserChange}/>}/>
            <Route path={pathname+"/newjournal"} component={() => <JournalInput petUrl={url+"journal"} setUserChange={setUserChange}/>}/>
            <Route path={pathname+"/reflections"} component={() => <ViewReflections reflectionUrl={url+"reflection"} setUserChange={setUserChange}/>}/>
            <Route path={pathname+"/newreflection"} component={() => <ReflectionInput reflectionUrl={url+"reflection"} setUserChange={setUserChange}/>}/>
            <Route path={pathname+"/moods"} component={() => <ViewMoods moodUrl={url+"moods"}/>}/>
            <Route path={pathname+"/newmood"} component={() => <MoodForm moodUrl={url+"moods"} setUserChange={setUserChange}/>}/>
            <Route path={pathname+"/login"} component={() => <LoginHome url={url}/>}/>
        </Switch>
      </div>
    </div>
    
  )};
export default LoginHome;