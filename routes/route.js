const express = require('express');
const router = express.Router()
const user = require('../controllers/user_controller');

router.use('/users', user);

module.exports = router;