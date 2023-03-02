import React from 'react';
import * as ReactDOM from 'react-dom/client';
import FrontPage from './components/FrontPage';
import { ChakraProvider, Box } from '@chakra-ui/react';
import handleTranslateClickHelper from './helpAPI/translate';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
const wakeupServer = handleTranslateClickHelper('wakeup', 'default');
wakeupServer.then(() => {
  console.log(wakeupServer);
});

root.render(
  <ChakraProvider>
    <Box maxW="100vw" maxH="100vh">
      <FrontPage />
    </Box>
  </ChakraProvider>
);
