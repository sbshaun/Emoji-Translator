import React from 'react';
import { ChakraProvider, Center } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
      <Center bg="tomato" h="100px" color="white">
        This is the Center
      </Center>
    </ChakraProvider>
  );
}

export default App;
