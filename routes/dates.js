const express = require('express');

const router = express.Router()

const DateController = require('../controllers/DateController');

router.post('/create',DateController.create)

module.exports = router;