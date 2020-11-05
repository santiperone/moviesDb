const express = require('express');
const router = express.Router();
const controller = require('../controllers/moviesController');

/* GET users listing. */
router.get('/', controller.all);

module.exports = router;