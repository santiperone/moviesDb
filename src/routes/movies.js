const express = require('express');
const router = express.Router();
const controller = require('../controllers/moviesController');

router.get('/', controller.all);
router.get('/detail/:id', controller.detail);
router.get('/recommended', controller.recom);
router.get('/new', controller.new);
router.get('/create', controller.createForm);
router.post('/create', controller.create);
router.get('/edit/:id', controller.editForm);
router.post('/edit/:id', controller.edit);
router.post('/search', controller.search);
router.get('/delete/:id', controller.deleteForm);
router.post('/delete/:id', controller.delete);

module.exports = router;