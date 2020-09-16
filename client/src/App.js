import React from 'react';
import { MoodForm, ViewMoods } from './components/Mood'
import { JournalInput, ViewJournals } from './components/Journal'
import SignUpForm from './components/Signup'
import LoginForm from './components/Login'
import {ReflectionInput, ViewReflections} from './components/Reflection'
import {ViewPet, ViewPetSimple} from './components/Pet'
import background from './assets/StartingBackground.png';
import egg from './assets/egg.png'
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
  console.log(egg)
  return (
    <div 
      style={style}
    >
      <h1>My Secret Garden</h1>
      <SignUpForm url={url+"user/signup"}/>
      <LoginForm url={url+"user/login"}/>
      <ReflectionInput reflectionUrl={url+"reflection"}/>
    </div>
  );
}

export default App;
