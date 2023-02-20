import { Request, Response } from 'express';
import prompts from '../utils/prompts';

export const translate = async (req: Request, res: Response) => {
	try {
		// Extract request parameters
		const { userInput, method } = req.body;

		// Set default prompt if method not found in prompts
		const prompt = prompts[method] || prompts['englishToEmojis'];

		// Check if userInput is provided
		if (!userInput) {
			return res
				.status(400)
				.json({ message: 'Bad Request: userInput parameter is missing' });
		}

		// TODO-1 BEGIN: Validate the userInput for safety and validity
		// code...

		// TODO-2 BEGIN: Feed prompt into chatGPT, get back output
		// code...

		// hardcoded sample output
		return res.json({
			message:
				'sample output: React 🚀 makes it painless' +
				'😌 to create interactive 🤝 UIs. Design 🎨 ' +
				'simple views 👀 for each state 📊 in your application 📱,' +
				' and React will efficiently 💪 update 🔃 and render 🎬 just ' +
				'the right 🔍 components ⚙️ when your data 📈 changes 🔄.',
		});
	} catch (error) {
		console.error(`translateHandler.ts error: ${error}`);
		return res.status(500).json({ message: 'Internal Server Error' });
	}
};
