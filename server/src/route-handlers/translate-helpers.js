const prompts = require('../../utils/prompts');
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

function generatePrompt(promptMethod, userInput) {
	// TODO-1 BEGIN: Validate the userInput for safety and validity
	// code...

	// TODO-2 BEGIN: Feed prompt into chatGPT, get back output
	// code...

	const prompt = prompts[promptMethod] || prompts['chat'];
	return `${prompt} "${userInput}"`;
}

exports.translate = async (req, res) => {
	try {
		// Extract request parameters
		const { userInput, method } = req.body;

		// TODO-1: Validate the userInput for safety and validity
		// code...

		// Check if userInput is provided
		if (!userInput) {
			return res.status(400).json({
				error: {
					message: 'Bad Request: userInput parameter is missing',
				},
			});
		}

		if (userInput === 'wakeup') {
			return res.status(200).json({ result: 'good' });
		}

		// Check if userInput starts with "111"
		if (!userInput.startsWith('1')) {
			return res.status(400).json({
				error: {
					message: 'Bad Request: userInput must start with "SECRET_NUMBER"',
				},
			});
		}

		// Remove prefix "111" from userInput
		const userInputWithoutPrefix = userInput.replace(/^1+/, '');

		// Check if userInput is provided
		if (!userInputWithoutPrefix) {
			return res.status(400).json({
				error: {
					message: 'Bad Request: no valid input parameter is missing',
				},
			});
		}

		// Set default prompt if method not found in prompts
		var prompt = generatePrompt(method, userInputWithoutPrefix);

		// ... help my little sis to do homework
		if (userInputWithoutPrefix.startsWith(7)) {
			const userInputChinese = userInput.replace(/^1+/, '');
			prompt = generatePrompt('hw', userInputChinese);
		}

		if (!configuration.apiKey) {
			res.status(500).json({
				error: {
					message:
						'OpenAI API key not configured, please follow instructions in README.md',
				},
			});
			return;
		}

		// Feed prompt into chatGPT, get back output
		try {
			const completion = await openai.createChatCompletion({
				model: 'gpt-3.5-turbo',
				messages: [{ role: 'user', content: prompt }],
				n: 1,
			});

			res.status(200).json({ result: completion.data.choices });
		} catch (error) {
			// Consider adjusting the error handling logic for your use case
			if (error.response) {
				console.error(error.response.status, error.response.data);
				res.status(error.response.status).json(error.response.data);
			} else {
				console.error(`Error with OpenAI API request: ${error.message}`);
				res.status(500).json({
					error: {
						message: 'An error occurred during your request.',
					},
				});
			}
		}
	} catch (error) {
		console.error(`translate-helper error: ${error}`);
		return res.status(500).json({ message: 'Internal Server Error' });
	}
};
