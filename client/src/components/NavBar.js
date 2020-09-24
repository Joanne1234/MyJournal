import { Link, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Logout from './Logout';
import { ViewMoods, MoodForm } from './Mood';
import { ViewPet, ViewPetSimple } from './Pet';
import {ViewReflections, ReflectionInput, ViewReflection } from './Reflection';
import {ViewJournals, ViewJournal, JournalInput} from './Journal'
import LoginHome from './LoginHome'
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

const BoxStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center'
}

const TitleStyle = {
    textAlign: 'center'
}

const ComponentStyle = {

}

const QuoteStyle = (quote) => {
    var display = 'none'
    if (quote === true) {
        display = 'block'
    } 
    return ({
        display: display
    })
}

const NavBar = ({url, setLoggedIn, pathname, loggedIn}) => {
    const [name, setName] = useState("")
    const [points, setPoints] = useState(0)
    const [change, setUserChange] = useState("")
    const [quote, setQuote] = useState("")
    const [author, setAuthor] = useState("")
    const [quoteAvailable, setQuoteAvailable] = useState(false)
    useEffect(() => {
        try {
            async function getUserDetails() {
                const user = await getObject(url+"user")  
                if (user.name != null && user.remainingPoints != null) {
                    setName(user.name)
                    setPoints(user.remainingPoints)
                }
            }
            /*async function getQuote() {
                const res = await getObject("https://quotes.rest/qod?category=inspire&language=en")
                if (res && res.contents && res.contents.quotes && res.contents.quotes.length() > 0) {
                    setQuoteAvailable(true)
                    setQuote(res.contents.quotes[0].quote)
                    setAuthor(res.contents.quotes[0].author)
                }
            }
            setQuote("")
            setAuthor("")
            setQuoteAvailable(false)*/
            setName("")
            setPoints(0)
            getUserDetails()
            //getQuote()
        } catch (err) {
            console.log("error:", err)
        }    
    }, [loggedIn, change])
    return (
      <div style={BoxStyle}>
      <div style={BoxStyle, TitleStyle}>
        <p>Welcome back {name}!</p>
        <p>Remaining points: {points}</p>
        <div style={QuoteStyle(quoteAvailable)}>
          <p>Your quote of the day: {quote}</p>
          <p>By {author}</p>
          </div>
      </div>
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
          <Route exact path={pathname+"/journals"} component={() => <ViewJournals journalUrl={url+"journal"} setUserChange={setUserChange}/>}/>
          <Route exact path={pathname+"/journals/:journalId"} component={() => <ViewJournal journalUrl={url+"journal"} setUserChange={setUserChange}/>}/>
          <Route path={pathname+"/journals/:journalId/edit"} component={() => <JournalInput journalUrl={url+"journal"} setUserChange={setUserChange}/>}/>
          <Route path={pathname+"/newjournal"} component={() => <JournalInput journalUrl={url+"journal"} setUserChange={setUserChange}/>}/>
          <Route exact path={pathname+"/reflections"} component={() => <ViewReflections reflectionUrl={url+"reflection"} setUserChange={setUserChange}/>}/>
          <Route path={pathname+"/newreflection"} component={() => <ReflectionInput reflectionUrl={url+"reflection"} setUserChange={setUserChange}/>}/>
          <Route exact path={pathname+"/reflections/:reflectionId"} component={() => <ViewReflection reflectionUrl={url+"reflection"}setUserChange={setUserChange}/>}/>
          <Route exact path={pathname+"/reflections/:reflectionId/edit"} component={() => <ReflectionInput reflectionUrl={url+"reflection"} setUserChange={setUserChange}/>}/>
          <Route path={pathname+"/moods"} component={() => <ViewMoods moodUrl={url+"moods"}/>}/>
          <Route path={pathname+"/newmood"} component={() => <MoodForm moodUrl={url+"moods"} setUserChange={setUserChange}/>}/>
          <Route path={pathname+"/login"} component={() => <LoginHome url={url}/>}/>
        </div>
      </div>  
      </div> 
    )};
export default NavBar;