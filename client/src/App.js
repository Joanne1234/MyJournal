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
      <ViewReflections reflectionUrl={url+"reflection"}/>
      <ReflectionInput reflectionUrl={url+"reflection"}/>
      <MoodForm moodUrl={url+"moods"}/>
    </div>
  );
}

export default App;
