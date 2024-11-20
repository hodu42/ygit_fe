import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Box, ChakraProvider, Container } from '@chakra-ui/react'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Fonts } from './styles/Fonts'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <Fonts/>
      <Box minHeight='100vh' bg='#F4F6F9'>
        <App />
      </Box>
    </ChakraProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
