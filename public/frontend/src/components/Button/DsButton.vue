<template>
  <button :aria-label="text"
          class="dsButton"
          :class="{ 'dsButton--outlined': outlined, 'dsButton--full': full }"
          :type="$attrs.type || 'button'"
          v-bind="$attrs">
    {{ text }}
  </button>
</template>

<script setup>
defineProps({
  full: { default: false, type: Boolean },
  outlined: { default: false, type: Boolean },
  text: { default: '', type: String, required: true },
});
</script>

<style lang="scss">
.dsButton {
  border: 1px solid var(--color-primary);
  background-color: var(--color-primary);
  border-radius: .25rem;
  color: var(--color-light);
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5rem;
  padding: .5rem .75rem;
  position: relative;
  transition: opacity .15s ease-in-out;
  text-align: center;

  &:hover, &:focus, &:active {
    opacity: .85;
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: .75;
  }

  &:not([disabled]) {
    cursor: pointer;
  }

  @media(min-width: 768px) {
    font-size: 1.25rem;
    padding: .5rem 1rem;
  }

  &--full {
    width: 100%;
  }

  &--outlined {
    border-color: inherit;
    background-color: transparent;
    color: var(--color-primary);
  }
}
</style>
