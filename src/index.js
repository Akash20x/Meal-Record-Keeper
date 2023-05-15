import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Provider } from "react-redux";
import { store } from "./store";
import { ChakraProvider, defineStyleConfig, extendTheme } from '@chakra-ui/react'
import BgImage from "../src/assets/background.png"

const Button = defineStyleConfig({
  baseStyle: {
    color: "white",
    m: "10px",
  },
  variants: {
    'with-blue': {
      bg: '#4f46e5',
      _hover: { bg: "#665ee6" },
    },
  }
})

const theme = extendTheme({
  components: {
    Button,
  },
  styles: {
    global: {
      body: {
        background: `url(${BgImage})`,
        backgroundSize: '15%',
      },
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
          <Provider store={store}>
            <App />
            </Provider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);

