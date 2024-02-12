const express = require('express');
const router = express.Router();
const dbUsers = require('../db/user');
const User = require('../modal/user');
const users = dbUsers.users;

// Get all users
router.get('/', (req, res) => {
    try {
        res.json(users.map(user => userp.toJSON()));
    } catch(error) {
        res.status(404).json({
            status: 'failed',
            message: error
        })
    }
});

// Get a specific user
router.get('/:userId', (req, res) => {
    try {
        const userId = req.params.userId;
        const user = users.find(user => user.id === userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user.toJSON());
    }catch(error) {
        res.status(404).json({
            status: 'failed',
            message: error
        })
    }
   
});

module.exports = router;