const express = require('express');
const User = require('../model/Model');
const router = express.Router();

// Save user
router.post('/', async (req, res) => {
    const { firstName, lastName } = req.body;
    try {
        const user = new User({ firstName, lastName });
        await user.save();
        res.status(201).send('User saved');
    } catch (error) {
        res.status(500).send('Error saving user');
    }
});

// Fetch all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send('Error fetching users');
    }
});

module.exports = router;
