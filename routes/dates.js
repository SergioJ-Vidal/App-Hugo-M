const express = require('express');
const router = express.Router()
const DateController = require('../controllers/DateController');
const { authentication } = require("../middleware/authentication");

router.post('/create',authentication,DateController.create)

module.exports = router;