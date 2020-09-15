import React from 'react';
import './App.css';
import { MoodForm, ViewMoods } from './components/Mood'
import { JournalInput, ViewJournals } from './components/Journal'
import SignUpForm from './components/Signup'
import LoginForm from './components/Login'

const url = "http://localhost:5000/api/"

function App() {
  console.log("rendering ap...")
  return (
    <div className="App">
      <h1>My Secret Garden</h1>
      <SignUpForm url={url+"user/register"}/>
    </div>
  );
}

export default App;
