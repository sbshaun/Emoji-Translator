import { Request, Response } from 'express';
import cors from 'cors';
import prompts from './prompts';
require('dotenv').config();

const express = require('express');
const app = express();
app.use(express.json());

const port = process.env.PORT;
const email = process.env.EMAIL;
const password = process.env.PASSWORD;

let whitelist = ['http://localhost:3000' || port];
app.use(
	cors({
		origin: function (origin, callback) {
			if ((process.env.PROD as string) !== 'true') {
				callback(null, true); // allow requests from all origins in dev mode
			} else if (whitelist.indexOf(origin!) !== -1) {
				callback(null, true);
			} else {
				callback(new Error('Not allowed by CORS'));
			}
		},
		credentials: true,
		methods: ['GET', 'POST', 'DELETE', 'PUT'],
	})
);

// Translate function
async function translate(req: Request, res: Response) {
	try {
		const userInput = req.body.userInput;
		const method =
			req.body.method in prompts ? req.body.method : 'englishToEmojis';
		let prompt = prompts[method];

		if (!userInput) {
			return res
				.status(400)
				.json({ message: 'Bad Request: userInput parameter is missing' });
		}

		// TODO-1 BEIGN: check input is safe && valid
		// code
		// code
		// code
		// TODO-1 END;

		// TODO-2 BEGIN: feed prompt into chatGPT, get back output
		// code
		// code
		// code
		// TODO-2 END;

		return res.json({ message: 'This should send the output' });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal Server Error' });
	}
}

app.get('/', (req: Request, res: Response) => {
	res.send(`Your made a GET request to "localhost:${port}/"`);
});

app.post('/translate', translate);

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
