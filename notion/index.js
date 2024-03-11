const express = require("express");
const router = express.Router();
const getData = require('./get/getData');
const postData = require('./post/postData');

//GET DATA
router.use('/get', getData);

//POST DATA
router.use('/post', postData);

module.exports = router;