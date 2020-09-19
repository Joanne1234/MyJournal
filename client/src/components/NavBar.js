import { Link, Route } from 'react-router-dom';
import React from 'react';
import Logout from './Logout';
import { ViewMoods, MoodForm } from './Mood';
import { ViewPet, ViewPetSimple } from './Pet';
import {ViewReflections, ReflectionInput } from './Reflection';
import {ViewJournals,JournalInput} from './Journal'
import LoginHome from './LoginHome'

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

const ComponentStyle = {

}

const NavBar = ({url, setLoggedIn, pathname, setUserChange}) => {
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
      <div style={ComponentStyle}>
      <Route path={pathname+"/pet"} component={() => <ViewPetSimple petUrl={url+"pet"}/>}/>
            <Route path={pathname+"/feedpet"} component={() => <ViewPet petUrl={url+"pet"} setUserChange={setUserChange}/>}/>
            <Route path={pathname+"/journals"} component={() => <ViewJournals journalUrl={url+"journal"} setUserChange={setUserChange}/>}/>
            <Route path={pathname+"/newjournal"} component={() => <JournalInput petUrl={url+"journal"} setUserChange={setUserChange}/>}/>
            <Route path={pathname+"/reflections"} component={() => <ViewReflections reflectionUrl={url+"reflection"} setUserChange={setUserChange}/>}/>
            <Route path={pathname+"/newreflection"} component={() => <ReflectionInput reflectionUrl={url+"reflection"} setUserChange={setUserChange}/>}/>
            <Route path={pathname+"/moods"} component={() => <ViewMoods moodUrl={url+"moods"}/>}/>
            <Route path={pathname+"/newmood"} component={() => <MoodForm moodUrl={url+"moods"} setUserChange={setUserChange}/>}/>
            <Route path={pathname+"/login"} component={() => <LoginHome url={url}/>}/>
      </div>
    </div>   
      
  )};
export default NavBar;