let express = require('express');
const path = require('path');
let router = express.Router();

/*
const APP = require('../src/app.js');
const template = require('../src/template.js');
const { createApp } = require('vue');
const { renderToString } = require('vue/server-renderer');
*/

router.get('/', async (req, res, next) => {
	res.sendFile(path.join(__dirname, '../public/frontend/dist', 'index.html'));
});

router.post('/', (req, res, next) => {
	res.send('respond with a resource');
});

module.exports = router;
