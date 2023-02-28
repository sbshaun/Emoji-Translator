const express = require('express');
const router = express.Router();
const { addUser, getUserByEmail } = require('./route-handlers/user-helpers');
const { translate } = require('./route-handlers/translate-helpers');

router.post('/users', addUser);
router.get('/users/:email', getUserByEmail);
router.post('/translate', translate);

module.exports = router;
