<template>
  <div class="">
    <h1 class="">{{ message }}</h1>
    <p class="">{{ messageCounter }}</p>
    <input type="text" v-mask="'###.###.###-##'" v-model="input" />
    <DsButton @click="updateCounter" text="Update counter" />
    <DsRadio label="Lab 1" name="radios" v-model="inputRadio" value="lab teste" />
    <DsRadio label="Lab 2" name="radios" v-model="inputRadio" value="lab testado" />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

import DsButton from '@/components/Button/DsButton.vue';
import DsRadio from '@/components/Inputs/DsRadio.vue';

const message = ref('Olá Mundo !');
const input = ref('');
const inputRadio = ref('lab teste');
const counter = ref(0);
const messageCounter = computed(() => `${message.value} - Contador com valor em ${counter.value}`);

const updateCounter = () => counter.value++;
</script>

<style lang="scss">
:root {
  --color-primary: #FF9624;
  --color-black: #000000;
  --color-black-light: #2C3E50;
  --color-light: #FFFFFF;
}


#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
}
</style>
