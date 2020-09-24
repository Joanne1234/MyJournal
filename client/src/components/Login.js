import React, {useState} from 'react';
import {
  Link
} from 'react-router-dom';
import 'rc-slider/assets/index.css';
import { 
    makeNewPost
} from '../fetch/generalFetch';
import ErrorMessage from './Error'
import history from './history'

const loginStyle = {
    alignContent: 'center',
    alignItems: 'center',
    margin: 5,
    padding: 5,
    backgroundColor: "cornsilk",
    alignSelf: 'center',
    display:'flex',
}

async function submitLogin(postUrl, email, password) {
    const loginDetails = {
        email: email,
        password: password
    }
    const login = await makeNewPost(postUrl, loginDetails)
    return (login)
}

const LoginForm = React.memo(({url, setLoggedIn}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [displayError, setDisplayError] = useState("none")
    const [error, setError] = useState("")
    async function login() {
      const user = await submitLogin(url, email, password)
        // invalid login details
        if (user && user.msg) {
            setDisplayError("block")
            setError(user.msg)
            return false
        }
        if (user && user["authToken"] && user["refreshToken"]) {
            setDisplayError("none")
            setError("")
            setLoggedIn(true)
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
          <div>
            <Link to={{pathname: '/home/pet'}}>
            <button 
              onClick={async (e) => {
                e.preventDefault()
                const loggedIn = await login()
                if (!loggedIn) {
                    return
                }
                setLoggedIn(true)
                history.push('/home/pet')
            }}
            > 
              Login
            </button>
            </Link>{' '}
          </div>
        </form>
      </div>
    );
})




export default LoginForm;