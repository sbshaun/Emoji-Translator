import React, { useState, useEffect } from 'react';
import styles from '../styles/FrontPage.module.scss';
import {
  Button,
  Image,
  VStack,
  HStack,
  Spacer,
  Textarea,
  Text,
  Box,
  Center,
  Select,
  Spinner,
} from '@chakra-ui/react';
import handleTranslateClickHelper from '../helpAPI/translate';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Login from './Login';
import { getTextAreaArray } from './ContentBox';
import logo from './logo-no-background.png';

const FrontPage = () => {
  const [inputText, setInputText] = useState('');
  const [isOutputCopied, setIsOutputCopied] = useState(false);
  const [translationMethod, setTranslationMethod] = useState('Select Method');
  const [userAuth, setUserAuth] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setUserAuth(user);
      } else {
        setUserAuth(null);
      }
    });
  }, [auth]);

  const handleTranslateClick = async () => {
    setIsLoading(true);
    const result = await handleTranslateClickHelper(
      inputText,
      translationMethod
    );
    if (result) {
      setResult(result);
    }
    setIsOutputCopied(false);
    setIsLoading(false);
  };

  return (
    <Center
      className={styles.frontPage}
      minH="100%"
      minW="100%"
      justifyContent="center"
    >
      {/* {userAuth === null ? (
        <Login setUser={setUserAuth} />
      ) : ( */}
      <Box w="100%" h="100%">
        <Center mb="3" mt={result?.length === 0 ? '50' : '1'}>
          <VStack w="100%" h="75%" pt="5" pb="5">
            {/* <Heading
                fontSize="3.5em"
                fontFamily="'Noto+Sans+Bamum', sans-serif"
                position="relative"
                display="inline-block"
                _after={{
                  content: "''",
                  position: 'absolute',
                  bottom: '-10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '50%',
                  height: '5px',
                  background: 'linear-gradient(to right, #ffc700, #ffdf00)',
                  borderRadius: '15px',
                  opacity: 0.7,
                }}
                style={{ userSelect: 'none', marginBottom: '11px' }}
              >
                Emojiers
              </Heading> */}
            <Image src={logo} alt="icon" h="50" />
            <Spacer minH="1" />
            <Textarea
              className={styles.inputBox}
              type="text"
              name="input"
              placeholder="Prefix SECRET_NUMBER to access."
              value={inputText}
              onChange={event => {
                setInputText(event.target.value);
              }}
              minH={result?.length === 0 ? '40vh' : '15vh'}
              maxW="70vw"
              overflowY="auto"
              resize="both"
            />
            <Spacer minH="1" />
            {isLoading ? (
              <Center>
                <Spinner mt="2" color="gray.500" size="lg" />
              </Center>
            ) : result?.length === 0 ? (
              <div></div>
            ) : (
              <VStack w="70vw" maxH="50vh">
                {result && getTextAreaArray(result, setIsOutputCopied)}
              </VStack>
            )}

            <Text
              position="sticky"
              fontWeight="bold"
              color="gray.500"
              _hover={{ cursor: 'pointer' }}
            >
              {isOutputCopied ? 'Copied' : ''}
            </Text>
          </VStack>
        </Center>
        <Center mt="-5">
          <VStack>
            <Select
              w="100%"
              className={styles.selectBox}
              placeholder="Select Method"
              value={translationMethod}
              onChange={async event => {
                setTranslationMethod(event.target.value);
              }}
            >
              <option value="Chat">Chat</option>
              <option value="englishToEmojis">To Emojis</option>
              <option value="emojisToEnglish">To English</option>
            </Select>
            <Spacer />
            <Center>
              <HStack className={styles.buttonContainer} w="100%">
                <Button
                  colorScheme="red"
                  minW="7rem"
                  onClick={() => {
                    setInputText('');
                    setIsOutputCopied(false);
                    setResult([]);
                  }}
                >
                  Clear
                </Button>

                <Spacer w="16" />

                <Button
                  colorScheme="green"
                  minW="7rem"
                  onClick={handleTranslateClick}
                >
                  Confirm
                </Button>
              </HStack>
            </Center>
          </VStack>
        </Center>
      </Box>
      {/* )} */}
    </Center>
  );
};

export default FrontPage;
