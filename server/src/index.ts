import { Request, Response } from 'express';
import cors from 'cors';
import { translate } from '../route_handlers/translateHandler';
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

// set up routes and route handler functions
app.get('/', (req: Request, res: Response) => {
	res.send(`Your made a GET request to "localhost:${port}/"`);
});

app.post('/translate', translate);

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
