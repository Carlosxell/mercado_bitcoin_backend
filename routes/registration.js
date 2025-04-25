let express = require('express');
let router = express.Router();

const APP = require('../src/app.js');
const { createApp } = require('vue');
const { renderToString } = require('vue/server-renderer');


router.get('/', async (req, res, next) => {
	const appInstance = createApp(APP);
	const AppHTML = await renderToString(appInstance);

	const HTML = `
           <!DOCTYPE html>
           <html>
           <head>
               <title>Página Vue com Express</title>
           </head>
           <body>
               ${AppHTML}
               <script src="https://cdn.jsdelivr.net/npm/vue@3.3.4/dist/vue.global.js"></script>
           </body>
           </html>
       `;

	res.send(HTML);
});

router.post('/', (req, res, next) => {
	res.send('respond with a resource');
});

module.exports = router;
