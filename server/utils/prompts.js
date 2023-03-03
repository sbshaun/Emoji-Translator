const prompts = {
	englishToEmojis:
		'I want you to act as an emoji translator, ' +
		'I will provide you sentence that does not contain emojis, ' +
		'and it is your job to provide rewrite the sentence with suited emojis, ' +
		'You will keep the original text, and you may replace words with emojis if necessary, ' +
		'you may not change anything if no emoji is needed. Do not convert everything into emojis, ' +
		'only add the minimum number amount of emojis if you consider necessary and suit the context. ' +
		'You will only provide the translated sentence and nothing else, ' +
		'no explanations. Here is my first sentence: ',

	emojisToEnglish:
		'I want you to act as an emoji translator. ' +
		'I will provide sentences that might contain emojis, and if they contain emojis, ' +
		'you will rewrite the emojis with suited English texts that suit the context. ' +
		'Do not change the original text drastically, only make changes where it is necessary. ' +
		'You will keep the meaning of the original text. ' +
		'Translate all emojis into English words or sentences suiting the context. ' +
		'If the text does not contain any emojis, return the exact same text. ' +
		'You will provide your response in the form of plain English text after you replace the emojis with English words or sentences. ' +
		'You will rewrite the text in a way that imitates the original tone of the text. ' +
		'Do not provide explanations or anything else other than your modified text. Here is my first request: ',
	chat:
		'I want you to talk to me in a casual way. Use colloquial language that is easy to understand. ' +
		'Do not repeat the words in my request.' +
		'Do not respond in any form to inform me that you are informed.' +
		'I will assume you will talk to me in a colloquial way just like we are friends, ' +
		'Keep your answer concise and if it is an inquery or techinical questions, ' +
		'provide as much details as possible (use bullet points to make your response clearer if necessary). ' +
		'You will respond to my future messages in the way I just requested.' +
		'Respond in the language you recieve. e.g. (if I send you messages in Chinese, you will respond in Chinese.)' +
		"respond with 'try again' if my message to you doesn't seem to make sense." +
		'The following texts are my message that you will reply me to: ',
	hw: '我希望你用中文回复我, 我希望你用口语的方式回复我的信息。以下是我给你的信息: ',
};

module.exports = prompts;
