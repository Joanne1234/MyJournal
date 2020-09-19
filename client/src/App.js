import React, {useState, useEffect} from 'react';
import background from './assets/StartingBackground.png';
import LoginHome from './components/LoginHome'
import { HashRouter, Switch, Route } from 'react-router-dom';
import SignUpForm from './components/Signup'
import LoginForm from './components/Login'
import { ViewMoods, MoodForm } from './components/Mood';
import { ViewPet, ViewPetSimple } from './components/Pet';
import {ViewReflections, ReflectionInput } from './components/Reflection';
import {ViewJournals,JournalInput} from './components/Journal'
import NavBar from './components/NavBar'
const url = "http://localhost:5000/api/"

const style = {  
  backgroundImage: "url(" + background + ")",
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  height: '100%',
  width: '100%',
  position: 'absolute',
  padding: 10,
  display: 'flex',
  flexDirection:'column',
  opacity: 0.8,
  overflow: 'scroll'
}

const header_style = {
  alignContent:'center',
  alignItems: 'center',
  display:'flex',
  flexDirection:'column'
}

const columnStyle = {
    display: 'flex',
    flexDirection:'column'
}

const unauthorisedStyle = (loggedIn) => {
    var display = "block"
    if (loggedIn === true) {
        display = "none"
    }
    return {
        display: display,
    }
}

const authorisedStyle = (loggedIn) => {
  var display = "none"
  if (loggedIn === true) {
      display = "block"
  }
  return {
      display: display,
  }
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [change, setUserChange] = useState(false)
  const pathname='/home'
  useEffect(() => {
    console.log("changed", change)
  }, [change])
  //          <Route exact path={pathname} component={() => <NavBar url={url} pathname="/home" setLoggedIn={setLoggedIn}/>}/>
  return (
    <div style={style}>
      <h1 style={header_style}>My Secret Garden</h1>
      <div>
      <HashRouter>
        <div style={unauthorisedStyle(loggedIn)}>
          <LoginHome url={url} loggedInPath="/home/pet"/>
        </div>
        <div style={authorisedStyle(loggedIn)}>
          <NavBar url={url} pathname="/home" setLoggedIn={setLoggedIn}/>
        </div>
        <div style={columnStyle}>
          <Switch>
            <Route path="/login" component={() => <LoginForm url={url+"user/login"} setLoggedIn={setLoggedIn}/>}/>
            <Route path="/signup"component={() => <SignUpForm url={url+"user/signup"} setLoggedIn={setLoggedIn}/>}/>
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
      </HashRouter>
      </div>
    </div>
  );
}

export default App;