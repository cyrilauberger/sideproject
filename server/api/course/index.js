'use strict';

var express = require('express');
var controller = require('./course.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/count/query/:query', controller.count);
router.get('/checked/random/:number', controller.random);
router.get('/checked/:currentPage/:size', controller.checked);
router.get('/:currentPage/:size/query/:query', controller.query);
router.get('/id/:integerId', controller.integerId);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/id/:integerId', controller.upsertIntegerId);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);


module.exports = router;
