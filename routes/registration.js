let express = require('express');
let router = express.Router();

const APP = require('../src/app.js');
const template = require('../src/template.js');
const { createSSRApp } = require('vue');
const { renderToString } = require('vue/server-renderer');


router.get('/', async (req, res, next) => {
	const appInstance = await createSSRApp(APP);
	const AppHTML = await renderToString(appInstance);

	const HTML = template.render(AppHTML);
	res.send(HTML);
});

router.post('/', (req, res, next) => {
	res.send('respond with a resource');
});

module.exports = router;
