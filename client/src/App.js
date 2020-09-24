import React from 'react';
import background from './assets/StartingBackground.png';
import LoginHome from './components/LoginHome'
import { BrowserRouter } from 'react-router-dom';
const url = process.env.REACT_APP_API_URL || "http://localhost:5000/api/"
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
  flexDirection:'column',
  //justifyContent: 'center',
  opacity: 0.8,
  overflow: 'scroll'
}

const header_style = {
  alignContent:'center',
  alignItems: 'center',
  display:'flex',
  flexDirection:'column'
}

function App() {
  return (
    <div 
      style={style}
    >
      <h1 style={header_style}>My Secret Garden</h1>
      <div>
      <BrowserRouter>
        <LoginHome url={url}/>
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;