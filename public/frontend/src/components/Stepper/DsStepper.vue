<template>
  <section class="dsStepper">
    <div class="dsStepper__header">
      <slot name="header">
        <small class="dsStepper__header__text">
          Etapa <span class="dsStepper__highlight">{{ activeStep + 1 }}</span> de {{ steps.length }}
        </small>
        <h4 class="dsStepper__header__title" v-if="steps[activeStep]?.title">{{ steps[activeStep]?.title }}</h4>
      </slot>
    </div>

    <div class="dsStepper__content">
      <slot :name="`step-${activeStep}`"></slot>
    </div>

    <div class="dsStepper__actions"
         :class="{ 'dsStepper__actions--initial': (activeStep < 1) }">
      <slot name="actions">
        <DsButton @click="handlePreviousStep"
                  :disabled="disabledPreviousStep"
                  outlined
                  :text="previousStepText"
                  v-if="(activeStep > 0)" />

        <DsButton @click="handleNextStep"
                  :disabled="disabledNextStep"
                  :full="(activeStep === 0)"
                  :text="nextStepText" />
      </slot>
    </div>
  </section>
</template>

<script setup>
import DsButton from '@/components/Button/DsButton.vue';

defineProps({
  activeStep: { default: 0, type: Number },
  disabledNextStep: { default: false, type: Boolean },
  disabledPreviousStep: { default: false, type: Boolean },
  nextStepText: { default: 'Continuar', type: String },
  previousStepText: { default: 'Voltar', type: String },
  steps: { default: () => [], required: true, type: Array },
});

const emit = defineEmits(['clickedNextStep', 'clickedPreviousStep']);
const handleNextStep = () => emit('clickedNextStep');
const handlePreviousStep = () => emit('clickedPreviousStep');


</script>

<style lang="scss">
.dsStepper {
  &__header {
    &__text {
      font-size: .75rem;
      font-weight: 500;
      letter-spacing: .1rem;
    }

    &__title {
      font-size: 1.25rem;
      font-weight: 600;
      letter-spacing: .1rem;
      margin: .5rem 0 1.5rem;
    }
  }

  &__highlight {
    color: var(--color-primary);
    font-weight: 600;
  }

  &__content {
    padding-top: 1.250rem;
  }

  &__actions {
    display: grid;
    gap: .875rem;
    grid-template-columns: 1fr 1fr;
    margin-top: 1.25rem;

    &--initial {
      grid-template-columns: 1fr;
    }
  }
}
</style>
