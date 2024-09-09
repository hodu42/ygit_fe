import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import { MainLogo } from './components/MainLogo';
import { Fonts } from './styles/Fonts'
import { IconMenus } from './components/IconMenus'

function App() {
  return (
    <BrowserRouter>
      <Fonts/>
      <MainLogo/>
      <IconMenus/>
    </BrowserRouter>
  );
}

export default App;
