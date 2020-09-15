import React from 'react';
import './App.css';
import { MoodForm, ViewMoods } from './components/Mood'
import { JournalInput, ViewJournals } from './components/Journal'

const url = "http://localhost:5000/api/"

function App() {
  console.log("rendering ap...")
  return (
    <div className="App">
      <h1>My Secret Garden</h1>
      <JournalInput journalUrl={url+"journal"}/>
      <ViewJournals journalUrl={url+"journal"}/>
    </div>
  );
}

export default App;
