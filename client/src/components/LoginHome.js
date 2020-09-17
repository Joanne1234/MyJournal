import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
  } from 'react-router-dom';
import React from 'react';
import SignUpForm from './Signup'
import LoginForm from './Login'
import { ViewMoods, MoodForm } from './Mood';
import { ViewPet } from './Pet';
import {ViewReflections, ReflectionInput } from './Reflection';
import {ViewJournals,ViewJournal,JournalInput} from './Journal'
import Home from './Home'

const LoginHomeStyle = {
    alignContent: 'center',
    margin: 20,
    padding: 5,
    color: 'black',
    textDecoration: 'none',
    outline: "solid black"
}
 
const LoginHome = ({url}) => (
    <div>
        <Link to={{pathname: '/login'}} style={LoginHomeStyle}>Login</Link>{' '}
        <Link to={{pathname: '/signup'}} style={LoginHomeStyle}>Sign Up</Link>{' '}
        <div>
        <Switch>
            <Route path="/login" component={() => <LoginForm baseUrl={url} url={url+"user/login"}/>}/>
            <Route path="/signup"component={() => <SignUpForm baseUrl={url} url={url+"user/signup"}/>}/>
            <Route exact path="/home" component={() => <Home url={url}/>}/>
        </Switch>
      </div>
    </div>
  );
export default LoginHome;