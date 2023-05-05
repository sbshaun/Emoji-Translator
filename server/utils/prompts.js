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
	chat: 'You will help me as I request.',
	hw: '我希望你用中文回复我。用中文回复我，以下是我给你的信息: ',
};

module.exports = prompts;
