import { createApp } from 'vue';
import App from './App.vue';
import MaskDirective from './directives/MaskDirective';

const APP = createApp(App)
APP.directive('mask', MaskDirective);

APP.mount('#app');
