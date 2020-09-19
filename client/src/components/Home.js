import {
    Link,
    Route,
    Switch,
  } from 'react-router-dom';
import React from 'react';
import { ViewPetSimple } from './Pet';
import Logout from './Logout';

const PetStyle = {
  margin: 20,
  padding: 5,
  color: 'black',
  textDecoration: 'none',
  backgroundColor: 'lightcoral',
  outline: 'thin solid black'
}

const JournalStyle = {
  margin: 20,
  padding: 5,
  color: 'black',
  textDecoration: 'none',
  backgroundColor: 'palegreen',
  outline: 'thin solid black'
}

const ReflectionStyle = {
  margin: 20,
  padding: 5,
  color: 'black',
  textDecoration: 'none',
  backgroundColor:"lavender",
  outline: 'thin solid black'
}

const MoodStyle = {
  margin: 20,
  padding: 5,
  color: 'black',
  textDecoration: 'none',
  backgroundColor:'paleturquoise',
  outline: 'thin solid black'
}

const NavStyle = {
  margin: 20,
  padding: 5,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'scroll',
}
const DisplayStyle = {
  margin: 20,
  padding: 5,
  display: 'flex',
  flexDirection: 'row',
  overflow: 'scroll'
}

const Home = ({url, setLoggedIn, setUserChange, pathname}) => {
  return (
    <div style={DisplayStyle}>
      <div style={NavStyle}>
      <Link to={{pathname: pathname+'/pet'}} style={PetStyle}>View Pet</Link>{' '}
      <Link to={{pathname: pathname+'/feedpet'}} style={PetStyle}>Feed Pet</Link>{' '}
      <Link to={{pathname: pathname+'/journals'}} style={JournalStyle}>Journals</Link>{' '}
      <Link to={{pathname: pathname+'/newjournal'}} style={JournalStyle}>Write a new Journal Entry</Link>{' '}
      <Link to={{pathname: pathname+'/reflections'}} style={ReflectionStyle}>Reflections</Link>{' '}
      <Link to={{pathname: pathname+'/newreflection'}} style={ReflectionStyle}>Write a new Reflection</Link>{' '}        
      <Link to={{pathname: pathname+'/moods'}} style={MoodStyle}>Mood</Link>{' '}
      <Link to={{pathname: pathname+'/newmood'}} style={MoodStyle}>New Mood</Link>{' '}
      <Logout url={url} setLoggedIn={setLoggedIn}/>
      </div> 
      <div style={DisplayStyle}>
        <Switch>
          <Route component={() => <ViewPetSimple petUrl={url+"pet"}/>}/>
        </Switch>
        <div >
        </div>
      </div>   
      
    </div>
  )};
export default Home;