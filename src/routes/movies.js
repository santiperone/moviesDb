const express = require('express');
const router = express.Router();
const controller = require('../controllers/moviesController');

/* GET users listing. */
router.get('/', controller.all);
router.get('/detail/:id', controller.detail);
router.get('/recommended', controller.recom);
router.get('/new', controller.new);
router.post('/search', controller.search);

module.exports = router;