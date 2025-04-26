const template = {
	render(AppHTML) {
		return `
			     <!DOCTYPE html>
           <html lang="pt-br">
           <head>
	           <meta charset="UTF-8" />
	           <meta name="viewport" content="width=device-width, initial-scale=1.0" />
	           <title>Mercado Bitcoin</title>
           </head>
           <body>
             <main class="">
               ${AppHTML}
             </main>
             <script src="https://cdn.jsdelivr.net/npm/vue@3.3.4/dist/vue.global.js"></script>
             <script type="module">
							import MeuComponente from './app.js';
							Vue.createApp(MeuComponente).mount('#app');
						</script>
           </body>
           </html>
		`
	}
};

module.exports = template;
