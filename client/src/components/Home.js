import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
  } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import { ViewMoods, MoodForm } from './Mood';
import { ViewPet, ViewPetSimple } from './Pet';
import {ViewReflections, ReflectionInput } from './Reflection';
import {ViewJournals,ViewJournal,JournalInput} from './Journal'
import LoginHome from './LoginHome';
import Logout from './Logout';
import { getObject } from '../fetch/generalFetch';
 
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


const Home = ({url}) => {
  const [buttonPressed, setButtonPressed] = useState(false)
  const [view, setView] = useState("block")
  const [renders, setRenders] = useState(0)
  const [name, setName] = useState("")
  const [points, setPoints] = useState(0)
  useEffect(() => {
    if (renders == 0) {
      setView("block")
    } else {
      setView("none")
    }
}, [buttonPressed])
  function onclick() {
    setRenders(renders+1)
    setButtonPressed(!buttonPressed)
  }
  try {
    async function getUserDetails(url){
      const user = await getObject(url+"user")
      if (!user) {
        return
      }
      setName(user.name)
      setPoints(user.remainingPoints)
      return user
    }
    useEffect(() => {
      getUserDetails(url)
    }, [buttonPressed])
  } catch (err){
      console.log(err)
  }
  return (
    <div style={DisplayStyle}>
      
    <Router>   
      <div style={NavStyle}>
      <p>Welcome back {name}!!!</p>
      <p>You have {points} food to feed your pet!</p>
      <Link to={{pathname: '/pet'}} style={PetStyle} onClick={onclick}>View Pet</Link>{' '}
      <Link to={{pathname: '/pet'}} style={PetStyle} onClick={onclick}>Feed Pet</Link>{' '}
      <Link to={{pathname: '/journals'}} style={JournalStyle} onClick={onclick}>Journals</Link>{' '}
      <Link to={{pathname: '/newjournal'}} style={JournalStyle} onClick={onclick}>New Journal</Link>{' '}
      <Link to={{pathname: '/reflections'}} style={ReflectionStyle} onClick={onclick}>Reflections</Link>{' '}
      <Link to={{pathname: '/newreflection'}} style={ReflectionStyle} onClick={onclick}>New Reflection</Link>{' '}        
      <Link to={{pathname: '/moods'}} style={MoodStyle}>Mood</Link>{' '}
      <Link to={{pathname: '/newmood'}} style={MoodStyle} onClick={onclick}>New Mood</Link>{' '}
      <Logout url={url}/>
      </div> 
      <div style={DisplayStyle}>
      <Switch>
        <Route path="/pet"component={() => <ViewPet petUrl={url+"pet"}/>}/>
        <Route path="/journals" component={() => <ViewJournals journalUrl={url+"journal"}/>}/>
        <Route path="/newjournal"component={() => <JournalInput petUrl={url+"journal"}/>}/>
        <Route path="/reflections"component={() => <ViewReflections reflectionUrl={url+"reflection"}/>}/>
        <Route path="/newreflection"component={() => <ReflectionInput reflectionUrl={url+"reflection"}/>}/>
        <Route path="/moods"component={() => <ViewMoods moodUrl={url+"moods"}/>}/>
        <Route path="/newmood"component={() => <MoodForm moodUrl={url+"moods"}/>}/>
        <Route path="/login"component={() => <LoginHome url={url}/>}/>
      </Switch>
      </div>   
      <div style={{display: view}}>
        <ViewPetSimple petUrl={url+"pet"}/>
      </div>
    </Router>
    </div>
  )};
export default Home;