const express = require('express');
const router = express.Router();
const users = require('../db/user');

// Get all users
router.get('/', (req, res) => {
    res.json(users);
});

module.exports = router;