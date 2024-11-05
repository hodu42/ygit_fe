import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { IconMenus } from './components/IconMenus'
import { Login } from './pages/Login'
import {Register} from "./pages/Register";
import {MyPage} from "./pages/MyPage";

function App():React.JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IconMenus/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/mypage" element={<MyPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
