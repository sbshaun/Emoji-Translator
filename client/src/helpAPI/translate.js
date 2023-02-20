const server_url = process.env.REACT_APP_SERVER_URL;

async function handleTranslateClick(inputText, translationMethod) {
  try {
    const response = await fetch(`${server_url}/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify({
        userInput: inputText,
        method: translationMethod,
      }),
    });
    const result = await response.json();
    return result['message'];
  } catch (error) {
    console.log(`translate.js file: ${error}`);
  }
}
export default handleTranslateClick;
