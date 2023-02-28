const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGODB_URL;

const connectionParams = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

mongoose.set('strictQuery', false);

module.exports = {
	connect: function () {
		return mongoose.connect(url, connectionParams);
	},
};
