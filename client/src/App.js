import React from 'react';
import './App.css';
import MoodInput from './components/Mood'

const url = "http://localhost:5000/api/"

function App() {
  return (
    <div className="App">
      <h1>My Secret Garden</h1>
      <MoodInput moodUrl={url+"moods"}/>
    </div>
  );
}

export default App;
