const express = require('express');
const { landingCtrlFunction } = require('../controllers/landingCtrlFile');

const router = express.Router();

router.get('/', landingCtrlFunction );

module.exports = router;