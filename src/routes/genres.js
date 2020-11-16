const express = require('express');
const router = express.Router();
const controller = require('../controllers/genresController');

router.get('/', controller.all);
router.get('/detail/:id', controller.detail);

module.exports = router;