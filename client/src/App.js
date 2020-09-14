import React from 'react';
import './App.css';
import { MoodInput, ViewMoods } from './components/Mood'

const url = "http://localhost:5000/api/"

function App() {
  console.log("rendering ap...")
  return (
    <div className="App">
      <h1>My Secret Garden</h1>
      <ViewMoods moodUrl={url+"moods"}/>
    </div>
  );
}

export default App;
