import React, {useState} from 'react';
import 'rc-slider/assets/index.css';
import { 
    makeNewPost
} from '../fetch/generalFetch';
import {InvalidLogInDetails} from './Error'

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

const LoginForm= React.memo(({url}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [displayError, setDisplayError] = useState("none")
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
          <InvalidLogInDetails display={displayError}/>
          <button 
            onClick={async (e) => {
                e.preventDefault()
                const user = await submitLogin(url,email,password)
                // invalid login details
                if (!user) {
                  setDisplayError("block")
                  return
                }
                setDisplayError("none")
                sessionStorage.setItem('authToken', user["authToken"])
                sessionStorage.setItem('refreshToken', user["refreshToken"])
            }}
          > 
            Login
          </button>
          <button 
            title = "Back"
            onClick={async (e) => {
                e.preventDefault()
            }}
          > 
            Back 
          </button>
        </form>
      </div>
    );
})




export default LoginForm;