const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	gmail: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

async function saveUser(gmail, email, password) {
	const user = new User({ gmail, email, password });
	try {
		await user.save();
		console.log('User saved to database');
		return true;
	} catch (err) {
		console.error(`Error saving user to database: ${err}`);
		return false;
	}
}

module.exports = { User, saveUser };
