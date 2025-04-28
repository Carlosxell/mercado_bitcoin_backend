<template>
  <label class="dsRadio"
         :class="{ 'dsRadio--disabled': disabled, 'dsRadio--checked': (modelValue === name) || (modelValue === value) }"
         :for="uuid"
         tabindex="0"
         v-bind="{ ...labelAttr, for: uuid }">
    <input @change="handleInput"
           @input="handleInput"
           class="dsRadio__input"
           :class="{ 'dsRadio__input--checked': (modelValue === name) || (modelValue === value), 'dsRadio__input--disabled': disabled }"
           :checked="(modelValue === name) || (modelValue === value)"
           :disabled="disabled"
           v-bind="{ ...$attrs, name, id: uuid }"
           type="radio"
           :value="modelValue" />
    <span class="dsRadio__label">{{ label }}</span>
  </label>
</template>

<script setup>
import { getCurrentInstance, ref } from 'vue';

const props = defineProps({
  checked: { default: false },
  disabled: { default: false, type: Boolean },
  id: { default: () => null },
  label: { default: '', type: String },
  labelAttr: { default: () => {}, type: Object },
  modelValue: { type: [ Boolean, Number, null, String, undefined ] },
  value: { type: [ Boolean, Number, null, String, undefined ] },
  name: { type: [ Boolean, Number, null, String, undefined ] },
});

const emit = defineEmits(['update:modelValue']);
const instance = getCurrentInstance();
const uuid = props.id ? props.id : ref(instance.uid);

const handleInput = (event) => {
  const { name } = event.target;
  const value = props.value && !name ? props.value : (props?.value || name);
  emit('update:modelValue', value);
}
</script>

<style lang="scss">
.dsRadio {
  position: relative;
  overflow: hidden;
  padding: .75rem 0;

  &__label {
    align-items: center;
    cursor: pointer;
    display: inline-flex;
    font-size: 1rem;
    font-weight: 500;
    min-height: 1.25rem;
    padding-left: 2rem;
    position: relative;
    text-transform: capitalize;

    &:after,
    &:before {
      border-radius: 50%;
      content: '';
      display: inline-block;
      position: absolute;
      transition: border-color .25s ease-in-out, background-color .25s ease-in-out, color .25s ease-in-out, transform .25s ease-in-out;
    }

    &:after {
      background-color: transparent;
      height: .75rem;
      left: .38rem;
      right: 0;
      transform: scale(1);
      transform-origin: center center;
      transition: transform .25s ease-in-out, background-color .25s ease-in-out;
      width: .75rem;
    }

    &:before {
      border: .175rem solid var(--color-primary);
      left: 0;
      height: 1.5rem;
      width: 1.5rem;
    }
  }

  &__input {
    height: 0;
    left: -624.9375rem;
    position: absolute;
    opacity: 0;
    width: 0;

    &--checked,
    &:checked {
      + .dsRadio__label {
        &:after {
          background-color: var(--color-primary);
          transform: scale(1);
        }
      }
    }
  }

  &--disabled {
    opacity: .75;

    &:hover {
      cursor: not-allowed;
    }
  }
}
</style>
