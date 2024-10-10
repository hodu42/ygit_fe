import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import { MainLogo } from './components/MainLogo';
import { IconMenus } from './components/IconMenus'

function App() {
  return (
    <BrowserRouter>
      <IconMenus/>
    </BrowserRouter>
  );
}

export default App;
