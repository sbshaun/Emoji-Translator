import { Textarea } from '@chakra-ui/react';

export function getTextArea(text, setIsOutputCopied) {
  return (
    <Textarea
      value={text.trim()}
      isReadOnly={true}
      key={text.trim()}
      type="text"
      overflowY="auto"
      minH="35vh"
      resize="both"
      onClick={() => {
        navigator.clipboard.writeText(text.trim());
        setIsOutputCopied(true);
      }}
    />
  );
}

export function getTextAreaArray(messages, setIsOutputCopied) {
  // return messages.map(message => {
  //   return <Box>{getTextArea(message.message.content, setIsOutputCopied)}</Box>;
  // });
  return getTextArea(messages[0].message.content, setIsOutputCopied);
}
