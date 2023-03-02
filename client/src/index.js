import React from 'react';
import * as ReactDOM from 'react-dom/client';
import FrontPage from './components/FrontPage';
import { ChakraProvider, Box } from '@chakra-ui/react';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <ChakraProvider>
    <Box maxW="100vw" maxH="100vh">
      <FrontPage />
    </Box>
  </ChakraProvider>
);
