import React from 'react';
import { MoodForm, ViewMoods } from './components/Mood'
import { JournalInput, ViewJournals } from './components/Journal'
import SignUpForm from './components/Signup'
import LoginForm from './components/Login'
import {ReflectionInput, ViewReflections} from './components/Reflection'
import {ViewPet, ViewPetSimple} from './components/Pet'
import background from './assets/StartingBackground.png';
import Home from './components/Home'
import LoginHome from './components/LoginHome'
import { BrowserRouter } from 'react-router-dom';
const url = "http://localhost:5000/api/"
const style = {  
  backgroundImage: "url(" + background + ")",
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  height: '100%',
  width: '100%',
  position: 'absolute',
  padding: 10,
  display: 'flex',
  justifyContent: 'center',
  opacity: 0.8,
}
function App() {
  return (
    <div 
      style={style}
    >
      <h1>My Secret Garden</h1>
      <BrowserRouter>
        <LoginHome url={url}/>
      </BrowserRouter>
      
    </div>
  );
}

export default App;