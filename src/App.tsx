import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { IconMenus } from './components/IconMenus'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IconMenus/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
