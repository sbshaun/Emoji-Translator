const { User } = require('../../db/api/user-schema');

async function addUser(req, res) {
	const { gmail, email, password } = req.body;
	const user = new User({ gmail, email, password });
	try {
		await user.save();
		console.log('User saved to database');
		res.status(201).send('User added successfully');
	} catch (err) {
		console.error(`Error saving user to database: ${err}`);
		res.status(500).send('Error adding user');
	}
}

async function getUserByEmail(req, res) {
	const { email } = req.params;
	try {
		const user = await User.findOne({ email });
		if (user) {
			res.send(user);
		} else {
			res.status(404).send(`User with email ${email} not found`);
		}
	} catch (err) {
		console.error(`Error getting user from database: ${err}`);
		res.status(500).send('Error getting user');
	}
}

module.exports = { addUser, getUserByEmail };
