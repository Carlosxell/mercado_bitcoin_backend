const { createApp } = require('vue');

const APP = {
	data() {
		return {
			message: 'Olá, mundo!'
		};
	},
	template: '<div>{{ message }}</div>'
};

module.exports = APP;
