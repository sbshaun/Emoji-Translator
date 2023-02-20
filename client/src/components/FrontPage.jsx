import React, { useState } from 'react';
import styles from '../styles/FrontPage.module.scss';
import {
  Button,
  Heading,
  VStack,
  HStack,
  Spacer,
  Textarea,
  Text,
} from '@chakra-ui/react';
import handleTranslateClickHelper from '../helpAPI/translate';

const FrontPage = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isOutputCopied, setIsOutputCopied] = useState(false);
  const [translationMethod, setTranslationMethod] =
    useState('english_to_emoji');

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
      <VStack maxW="70%" minW="70%" minH="100px">
        <Heading fontSize="3.5em" fontFamily="'Noto+Sans+Bamum', sans-serif">
          Emoji Dictionary
        </Heading>
        <Spacer />
        <Textarea
          className={styles.inputBox}
          type="text"
          name="input"
          placeholder="Input Box"
          value={inputText}
          onChange={event => {
            setInputText(event.target.value);
          }}
          minH="110px"
        />
        <Textarea
          className={styles.output}
          placeholder="Output"
          value={outputText}
          onChange={event => {
            setOutputText(event.target.value);
          }}
          minH="150px"
          readOnly={true}
          onClick={handleCopyClick}
          _hover={{ cursor: 'pointer' }}
        />
        <Text
          position="sticky"
          top={1.5}
          right={0}
          mr={3}
          mt={3}
          fontWeight="bold"
          fontSize="sm"
          color="gray.500"
          _hover={{ cursor: 'pointer' }}
          onClick={handleCopyClick}
        >
          {isOutputCopied ? 'Copied' : 'Click to Copy'}
        </Text>
      </VStack>
      <HStack spacing="25px" className={styles.buttonContainer}>
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
        <Spacer w="120px" />
        <Button colorScheme="green" minW="50px" onClick={handleTranslateClick}>
          Translate
        </Button>
      </HStack>
    </div>
  );
};

export default FrontPage;
