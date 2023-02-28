const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connect } = require('../db/db');
const routes = require('./routes');
const app = express();
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
// allow requests only from example.com
const corsOptions = {
	origin: process.env.ALLOWED_ORIGIN,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

connect()
	.then(() => console.log('Connected to the database'))
	.catch(err => console.error(`Error connecting to the database: ${err}`));

app.use(routes);

const apiPort = process.env.PORT || 4000;
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
