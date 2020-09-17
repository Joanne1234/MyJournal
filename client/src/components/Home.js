import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
  } from 'react-router-dom';
import React from 'react';
import { ViewMoods, MoodForm } from './Mood';
import { ViewPet } from './Pet';
import {ViewReflections, ReflectionInput } from './Reflection';
import {ViewJournals,ViewJournal,JournalInput} from './Journal'
import LoginHome from './LoginHome';
 
const HomeStyle = {
  alignContent: 'center',
  margin: 20,
  padding: 5,
  color: 'black',
  textDecoration: 'none',
  outline: "solid black"
}

const Home = ({url}) => (
    <Router>        
      <Link to={{pathname: '/pet'}} style={HomeStyle}>Pet</Link>{' '}
      <Link to={{pathname: '/journals'}} style={HomeStyle}>Journals</Link>{' '}
      <Link to={{pathname: '/newjournal'}} style={HomeStyle}>New Journal</Link>{' '}
      <Link to={{pathname: '/reflections'}} style={HomeStyle}>Reflections</Link>{' '}
      <Link to={{pathname: '/newreflection'}} style={HomeStyle}>New Reflection</Link>{' '}        <Link to={{pathname: '/moods'}} style={HomeStyle}>Mood</Link>{' '}
      <Link to={{pathname: '/newmood'}} style={HomeStyle}>New Mood</Link>{' '}
      <Link to={{pathname: '/logout'}} style={HomeStyle}>Logout</Link>{' '}
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
    </Router>
  );
export default Home;