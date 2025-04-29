<template>
  <div class="dsInput">
    <label class="dsInput__formLabel"
           :for="uuid">{{ label }}</label>

    <div class="dsInput__wrapper">
      <input @change="handleInput"
             @input="handleInput"
             autocomplete="new-password"
             class="dsInput__formInput"
             :class="{ 'dsInput__formInput--error': errorMessages.length }"
             :disabled="disabled"
             :readonly="readonly"
             :value="modelValue || value"
             ref="input"
             :type="type"
             v-mask="mask || ''"
             v-bind="{ ...$attrs, id: uuid }" />
      <button @click="handleClickClearable"
              class="dsInput__closeBtn"
              type="button"
              v-if="modelValue || value">X</button>
    </div>

    <div class="dsInput__footer" v-if="errorMessages.length">{{ errorMessages }}</div>
  </div>
</template>

<script setup>
import { getCurrentInstance, ref } from 'vue';

const props = defineProps({
  clearable: { default: false, type: Boolean },
  disabled: { default: false, type: Boolean },
  errorMessages: { default: '', type: String },
  id: { type: String },
  label: { type: String },
  mask: { default: '', type: String },
  modelValue: { type: [Number, String] },
  readonly: { default: false, type: Boolean },
  type: { default: 'text', type: String },
  value: { type: [Number, String] },
});

const emit = defineEmits(['update:modelValue', 'clicked:clearable', 'clicked:icon']);
const instance = getCurrentInstance();
const uuid = props.id ? props.id : ref(instance.uid);
const input = ref(null);

function handleInput(event) {
  let { value } = event.target;

  if (props.type === 'number') { value = String(value); }
  emit('update:modelValue', value);
}

function handleClickClearable() {
  emit('update:modelValue', '')
  emit('clicked:clearable')
}
</script>

<style lang="scss">
.dsInput {
  margin-bottom: 1.25rem;
  position: relative;

  &__formLabel {
    display: inline-block;
    font-size: 1.125rem;
    font-weight: 500;
    letter-spacing: .0625rem;
    line-height: 1.5rem;
    padding-bottom: .25rem;
  }

  &__wrapper {
    display: flex;
    position: relative;
    max-width: 100%;
  }

  &__formInput {
    border: .065rem solid inherit;
    border-radius: .25rem;
    color: var(--color-black);
    font-size: 1rem;
    min-height: 1.5rem;
    outline: .065rem solid inherit;
    padding: .5rem 2.5rem .25rem .75rem;
    transition: border-color .12s ease-in-out, outline .12s ease-in-out;
    width: 100%;

    &::placeholder {
      font-size: 1rem;
      font-weight: 500;
      letter-spacing: .0625rem;
      line-height: 1rem;
      vertical-align: bottom;
    }

    &:hover, &:focus {
      border-color: var(--color-primary);
      outline: .065rem solid var(--color-primary);
    }

    &--error {
      color: var(--color-danger);
    }
  }

  &__footer {
    color: var(--color-danger);
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.1rem;
    left: 0;
    line-height: 1rem;
    margin-top: .25rem;
    position: absolute;
    top: 100%;
  }

  &__closeBtn {
    background-color: transparent;
    border: none;
    bottom: .065rem;
    color: var(--color-danger);
    cursor: pointer;
    font-size: 1rem;
    font-weight: 700;
    height: 100%;
    position: absolute;
    right: .065rem;
    top: .065rem;
    width: 2rem;
  }
}
</style>
