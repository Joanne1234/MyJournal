import React from 'react'
import {makeNewPost} from '../fetch/generalFetch'
import url from './url'
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import LoginHome from './LoginHome'
import history from './history'

async function logout() {
    const loggedout = await makeNewPost(url+"user/logout", {})
    return loggedout
}

const Logout = ({url}) => {
    return (
      <div>
        <Switch>
          <Link to={{pathname: '/logout'}}>
            <button 
              title = "Logout"
              onClick={async (e) => {
                  e.preventDefault()
                  const loggedout = await logout(url)
                  console.log(loggedout)
                  // clear tokens
                  sessionStorage.removeItem('authToken')
                  sessionStorage.removeItem('refreshToken')
                  // return to login/signup page
                  history.push('/login')
              }}
            > 
              Log out
            </button>
          </Link>{' '}
          <Route path="/login"component={() => <LoginHome url={url}/>}/>
        </Switch>
      </div>
    )
}

export default Logout

