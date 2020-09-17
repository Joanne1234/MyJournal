import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import 'rc-slider/assets/index.css';
import { 
    makeNewPost
} from '../fetch/generalFetch';
import ErrorMessage from './Error'
import Home from './Home'

const loginStyle = {
    alignContent: 'center',
    margin: 5,
    padding: 5,
    outline: "thick solid cornsilk",
    alignSelf: 'center',
}

async function submitLogin(postUrl, email, password) {
    console.log("patchjournal...",email, password)
    const loginDetails = {
        email: email,
        password: password
    }
    const login = await makeNewPost(postUrl, loginDetails)
    return (login)
}

const LoginForm= React.memo(({baseUrl, url}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [displayError, setDisplayError] = useState("none")
    const [error, setError] = useState("")
    async function login() {
      const user = await submitLogin(url,email,password)
        console.log("user:")
        console.log(user)
        // invalid login details
        if (user && user.msg) {
            console.log("login failed")
            setDisplayError("block")
            setError(user.msg)
            return false
        }
        if (user && user["authToken"] && user["refreshToken"]) {
            setDisplayError("none")
            setError("")
            sessionStorage.setItem('authToken', user["authToken"])
            sessionStorage.setItem('refreshToken', user["refreshToken"])
            return true
        }
        setDisplayError("block")
        setError("Unknown error occurred")
        return false
    }
    return (
      <div style={loginStyle}>
        <form>
          <p>Email: 
          <input 
            type="text"
            onChange={(e) => {
                setEmail(e.target.value)
            }}
          />
          </p>
          <p>Password: 
          <input 
            type="password"
            onChange={(e) => {
                setPassword(e.target.value)
            }}
          />
          </p>
          <ErrorMessage display={displayError} msg={error}/>
          <Router>
            <div>
            <Link to={{pathname: '/home'}}>
            <button 
              onClick={async (e) => {
                console.log("button clicked")
                const loggedIn = await login()
                console.log(loggedIn)
                if (loggedIn) {
                    console.log("not loggedin...", loggedIn)
                    e.preventDefault()
                    return
                }
                console.log("loggedin". loggedIn)
            }}
          > Login
          </button>
          </Link>{' '}
          <Switch>
                <Route path="/home" component={() => <Home baseUrl={baseUrl}/>}/>
                </Switch>
            </div>
          </Router>

        </form>
      </div>
    );
})




export default LoginForm;