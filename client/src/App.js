import React from 'react';
import './App.css';
import { MoodForm, ViewMoods } from './components/Mood'
import { JournalInput, ViewJournals } from './components/Journal'
import {ReflectionInput, ViewReflections} from './components/Reflection'

const url = "http://localhost:5000/api/"

function App() {
  console.log("rendering ap...")
  return (
    <div className="App">
      <h1>My Secret Garden</h1>
      <ReflectionInput reflectionUrl={url+"reflection"}/>
      <JournalInput reflectionUrl={url+"journal"}/>
      <MoodForm moodUrl={url+"moods"}/>
    </div>
  );
}

export default App;
