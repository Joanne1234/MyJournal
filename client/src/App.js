import React, {useState} from 'react';
import background from './assets/StartingBackground.png';
import LoginHome from './components/LoginHome'
import { HashRouter, Switch, Route } from 'react-router-dom';
import SignUpForm from './components/Signup'
import LoginForm from './components/Login'
import NavBar from './components/NavBar'

const url = process.env.REACT_APP_API_URL_ || "http://localhost:5000/api/"

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
  const pathname='/home'
  return (
    <div style={style}>
      <h1 style={header_style}>My Secret Garden</h1>
      <div>
      <HashRouter>
        <div style={unauthorisedStyle(loggedIn)}>
          <LoginHome url={url} loggedInPath="/home/pet"/>
        </div>
        <div style={authorisedStyle(loggedIn)}>
          <NavBar url={url} pathname={pathname} setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>
        </div>
        <div style={columnStyle}>
          <Switch>
            <Route path="/login" component={() => <LoginForm url={url+"user/login"} setLoggedIn={setLoggedIn}/>}/>
            <Route path="/signup"component={() => <SignUpForm url={url+"user/signup"} setLoggedIn={setLoggedIn}/>}/>
            <Route path="/home" component={null}/>
          </Switch>
        </div>
      </HashRouter>
      </div>
    </div>
  );
}

export default App;