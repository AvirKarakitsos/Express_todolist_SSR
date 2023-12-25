const express = require('express');
const router = express.Router();
const api = require('../controllers/ApiController');

router.get('/',api.index)

router.get('/:id',api.getOneTask)

module.exports = router;