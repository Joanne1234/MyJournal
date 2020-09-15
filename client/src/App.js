import React from 'react';
import './App.css';
import { MoodForm, ViewMoods } from './components/Mood'
import { JournalInput, ViewJournals } from './components/Journal'
import {ReflectionInput, ViewReflections} from './components/Reflection'
import {ViewPet, ViewPetSimple} from './components/Pet'

const url = "http://localhost:5000/api/"

function App() {
  console.log("rendering ap...")
  return (
    <div className="App">
      <h1>My Secret Garden</h1>
      <ViewPetSimple petUrl={url+"pet"}/>
      <ViewPet petUrl={url+"pet"}/>
      <ViewReflections reflectionUrl={url+"reflection"}/>
      <ReflectionInput reflectionUrl={url+"reflection"}/>
      <MoodForm moodUrl={url+"moods"}/>
    </div>
  );
}

export default App;
