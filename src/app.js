const {
	computed,
	onMounted,
	ref
} = require('vue');

const APP = {
	name: 'App',
	props: {},
	emits: [],
	setup(props, { emit }) {
		const message = ref('Olá Mundo !');
		const counter = ref(0);
		const messageCounter = computed(() => `${message.value} - Contador com valor em ${counter.value}`);

		const updateCounter = () => counter.value++;

		return {
			message,
			counter,
			messageCounter,
			updateCounter
		};
	},
	template: `
    <div class="" id="app">
			<h1 class="">{{ message }}</h1>
			<p class="">{{ messageCounter }}</p>
			<button @click="updateCounter">Update counter</button>
		</div>
	`
};

module.exports = APP;
