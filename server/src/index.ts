import express, { Request, Response } from 'express';
import axios from 'axios';

const app = express();

// Parse JSON
app.use(express.json());

// Enable CORS
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

// Get the email and password from environment variables
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;

// Customized prompts
const ENGLISH_TO_EMOJIS_PROMPT = 'abc';

// Translate function
async function translate(req: Request, res: Response) {
	try {
		const user_input = req.body.user_input;
		const method = req.body.method || 'english_to_emoji';

		if (!user_input) {
			return res
				.status(400)
				.json({ message: 'Bad Request: user_input parameter is missing' });
		}

		// Default from English to emojis
		let prompt = ENGLISH_TO_EMOJIS_PROMPT;
		if (method.toLowerCase() === 'emoji_to_english') {
			prompt = '';
		}

		// Get the conversation ID
		const session_resp = await axios.post(
			'https://api.openai.com/v1/conversations',
			{
				prompt: 'hello',
				temperature: 0.7,
				max_tokens: 1,
			},
			{
				auth: {
					username: EMAIL,
					password: PASSWORD,
				},
			}
		);
		const conversation_id = session_resp.data.conversation_id;

		// Send user input to OpenAI API for translation
		const resp = await axios.post(
			'https://api.openai.com/v1/completions',
			{
				prompt: `${prompt} ${user_input}`,
				temperature: 0.7,
				max_tokens: 1024,
				n: 1,
				stop: '.',
			},
			{
				auth: {
					username: EMAIL,
					password: PASSWORD,
				},
			}
		);

		// Return the translated message
		return res.json({ message: resp.data.choices[0].text.trim() });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal Server Error' });
	}
}

// Route to handle translation requests
app.post('/translate', translate);

const port = process.env.PORT || 4000;

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
