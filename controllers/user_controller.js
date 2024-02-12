const express = require('express');
const router = express.Router();
const dbUsers = require('../db/user');
const User = require('../modal/user');
const users = dbUsers.users;

// Get all users
router.get('/', (req, res) => {
    try {
        res.json(users.map(user => user.toJSON()));
    } catch(error) {
        res.status(400).json({
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
        res.status(400).json({
            status: 'failed',
            message: error
        })
    }
   
});

// Create a new user
router.post('/', (req, res) => {
    try{
        const { username, age, hobbies } = req.body;
        if (!username || !age) {
            return res.status(400).json({ error: 'Username and age are required' });
        }
        const newUser = new User(username, age, hobbies);
        users.push(newUser);
        res.status(201).json({
            message: 'User created successfully',
            user: newUser.toJSON()
        });
    }catch(error) {
        res.status(400).json({
            status: 'failed',
            message: `failed to create user due to ${error.message ? error.message : error}`
        })
    }
    
});

// update a user
router.put('/:userId', (req, res) => {
    try{
        const userId = req.params.userId;
        const { username, age, hobbies } = req.body;
        const user = users.find(user => user.id === userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.username = username || user.username;
        user.age = age || user.age;
        user.hobbies = hobbies || user.hobbies;
    
        res.status(201).json({
            message: 'User updated successfully',
            user: user.toJSON()
        });
    }catch(error) {
        res.status(400).json({
            status: 'failed',
            message: `failed to update user due to ${error.message ? error.message : error}`
        })
    }
});

// DELETE a user
router.delete('/:userId', (req, res) => {
    try{
        const userId = req.params.userId;
        const index = users.findIndex(user => user.id === userId);
        if (index === -1) {
            return res.status(404).json({ error: 'User not found' });
        }
        users.splice(index, 1);
        res.status(404).json({
            status: 'success',
            message: 'user deleted successfully'
        })

    }catch(error) {
        res.status(400).json({
            status: 'failed',
            message: `failed to delete user due to ${error.message ? error.message : error}`
        })
    }
    
});

module.exports = router;