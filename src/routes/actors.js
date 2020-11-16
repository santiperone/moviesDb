const express = require('express');
const router = express.Router();
const controller = require('../controllers/actorsController');

router.get('/', controller.all);
router.get('/detail/:id', controller.detail);
router.get('/create', controller.createForm);
router.post('/create', controller.create);
router.get('/edit/:id', controller.editForm);
router.post('/edit/:id', controller.edit);
router.get('/delete/:id', controller.deleteForm);
router.post('/delete/:id', controller.delete);

module.exports = router;