import React, { useState, useEffect } from 'react';
import styles from '../styles/FrontPage.module.scss';
import {
  Button,
  Heading,
  VStack,
  HStack,
  Spacer,
  Textarea,
  Text,
  Box,
  Center,
  Select,
} from '@chakra-ui/react';
import handleTranslateClickHelper from '../helpAPI/translate';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Login from './Login';

const FrontPage = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isOutputCopied, setIsOutputCopied] = useState(false);
  const [translationMethod, setTranslationMethod] =
    useState('english_to_emoji');
  const [userAuth, setUserAuth] = useState(null);

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
    const result = await handleTranslateClickHelper(
      inputText,
      translationMethod
    );
    setOutputText(result);
    setIsOutputCopied(false);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(outputText);
    setIsOutputCopied(true);
  };

  return (
    <div className={styles.frontPage}>
      {userAuth === null ? (
        <Login setUser={setUserAuth} />
      ) : (
        <Box minW="40%" minH="80%" mr="16">
          <VStack minW="100%" minH="90%">
            <Heading
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
              style={{ userSelect: 'none' }}
            >
              Emojiers
            </Heading>
            <Spacer flex={1} />
            <Textarea
              className={styles.inputBox}
              type="text"
              name="input"
              placeholder="Input Box"
              value={inputText}
              onChange={event => {
                setInputText(event.target.value);
              }}
              minH="28"
            />
            <Spacer flex={0.5} />
            <Textarea
              className={styles.output}
              placeholder="Output"
              value={outputText}
              onChange={event => {
                setOutputText(event.target.value);
              }}
              minH="64"
              maxH="2xs"
              readOnly={true}
              onClick={handleCopyClick}
              _hover={{ cursor: 'pointer' }}
            />
            <Spacer flex={0} />
            <Text
              position="sticky"
              fontWeight="bold"
              color="gray.500"
              _hover={{ cursor: 'pointer' }}
              onClick={handleCopyClick}
            >
              {isOutputCopied ? 'Copied' : 'Click to Copy'}
            </Text>
          </VStack>

          <Center>
            <HStack className={styles.buttonContainer} ml="3">
              <Button
                colorScheme="red"
                minW="90px"
                onClick={() => {
                  setInputText('');
                  setOutputText('');
                  setIsOutputCopied(false);
                }}
              >
                Clear
              </Button>
              <Spacer />
              <Select
                className={styles.selectBox}
                placeholder="Select translation method"
                value={translationMethod}
                onChange={event => {
                  setTranslationMethod(event.target.value);
                }}
              >
                <option value="english_to_emoji">English to Emoji</option>
                <option value="emoji_to_english">Emoji to English</option>
              </Select>
              <Spacer />
              <Button
                colorScheme="green"
                minW="50px"
                onClick={handleTranslateClick}
              >
                Translate
              </Button>
            </HStack>
          </Center>
        </Box>
      )}
    </div>
  );
};

export default FrontPage;
