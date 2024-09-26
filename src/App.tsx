import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import { MainLogo } from './components/MainLogo';
import { IconMenus } from './components/IconMenus'

function App() {
  return (
    <BrowserRouter>
      <MainLogo/>
      <IconMenus/>
    </BrowserRouter>
  );
}

export default App;
