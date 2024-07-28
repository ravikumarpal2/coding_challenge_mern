const express = require('express');
const router = express.Router();
const { getBarChart, getPieChart } = require('../controllers/chartsController');

router.get('/bar', getBarChart);
router.get('/pie', getPieChart);

module.exports = router;