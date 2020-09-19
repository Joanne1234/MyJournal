import React, {useState} from 'react';
import 'rc-slider/assets/index.css';
import { 
    makeNewPost
} from '../fetch/generalFetch';
import ErrorMessage from './Error'
import {
  Link
} from 'react-router-dom';
import history from './history'

const signUpStyle = {
    alignContent: 'center',
    margin: 5,
    padding: 5,
    backgroundColor: "orange",
    alignSelf: 'center'
}

const reqStyle = {
    fontSize: "smaller",
    fontWeight: "lighter",
}

async function submitSignUp(postUrl, name, email, password) {
    console.log("patchjournal...", name, email,password)
    const signUpDetails = {
        name: name,
        email: email,
        password: password
    }
    const signUp = await makeNewPost(postUrl, signUpDetails)
    return (signUp)
}

const SignUpForm= React.memo(({url, setLoggedIn}) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [displayError, setDisplayError] = useState("none")
    const [error, setError] = useState("")
    return (
      <div style={signUpStyle}>
        <form>
          <p>Name:
          <input 
            type="text"
            onChange={(e) => {
                setName(e.target.value)
            }}
          />
          </p>
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
          <p style={reqStyle}>Must be at least 6 characters long</p>
          <ErrorMessage 
            display={displayError} 
            msg={error}
          />
          <div>
              <Link to={{pathname: '/home/pet'}}>
                <button 
                  onClick={async (e) => {
                    e.preventDefault()
                    const user = await submitSignUp(url,name,email,password)
                    console.log("user", user)
                    // invalid login details
                    if (user.msg) {
                      setDisplayError("block")
                      setError(user.msg)
                      return
                    }
                    setLoggedIn(true)
                    setDisplayError("none")
                    sessionStorage.setItem('authToken', user["authToken"])
                    sessionStorage.setItem('refreshToken', user["refreshToken"])
                    history.push('/home/pet')
                  }}
                > 
                  Sign Up
                </button>
                </Link>
            </div>
        </form>
      </div>
    );
})




export default SignUpForm;