import React from 'react';
import * as ReactDOM from 'react-dom/client';
import FrontPage from './components/FrontPage';
import { ChakraProvider } from '@chakra-ui/react';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <ChakraProvider>
    <FrontPage />
  </ChakraProvider>
);
