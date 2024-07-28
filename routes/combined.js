const express = require('express');
const router = express.Router();
const { getCombined } = require('../controllers/combinedController');

router.get('/', getCombined);

module.exports = router;