import React from 'react';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom'
import { MainLogo } from './components/MainLogo';
import theme from './styles/theme'
import { Fonts } from './styles/Fonts'

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Fonts/>
        <MainLogo/>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
