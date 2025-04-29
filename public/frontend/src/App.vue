<template>
  <form @submit.prevent="handleSubmit"
        autocomplete="off"
        class="appContent">
    <DsStepper @clickedNextStep="handleNextStep"
               @clickedPreviousStep="handlePreviousStep"
               :activeStep="activeStep"
               :disabledNextStep="sending || disabledNextStep"
               :disabledPreviousStep="sending"
               :nextStepText="sending ? 'Enviando dados' : (activeStep > 2) ? 'Cadastrar' : 'Continuar'"
               :steps="steps"
               v-if="!sended">
      <template #step-0>
        <DsInput label="Endereço de e-mail"
                 placeholder="example@gmail.com"
                 type="email"
                 v-model="form.email" />

        <div class="gridA">
          <DsRadio :label="item.label"
                   :key="index"
                   name="radios"
                   v-model="form.documentType"
                   :value="item.value" v-for="(item, index) in radioList" />
        </div>
      </template>

      <template #step-1>
        <FormStepUser @updateForm="handleUpdateForm"
                      :formDefault="form"
                      :typeDocument="form.documentType" />
      </template>

      <template #step-2>
        <DsInput label="Sua senha"
                 placeholder="******"
                 type="password"
                 v-model="form.password" />
      </template>

      <template #step-3>
        <FormStepConfirm @updateForm="handleUpdateForm"
                         :disabledForm="sending"
                         :formDefault="form"
                         :typeDocument="form.documentType" />
      </template>
    </DsStepper>

    <div class="appContent__sendedMessage" v-if="sended">
      <p>Dados enviados com sucesso !</p>
      <DsButton @click="resetForm" text="Voltar" />
    </div>
  </form>
</template>

<script setup>
import { computed, ref } from 'vue';

import DsStepper from '@/components/Stepper/DsStepper.vue';
import DsInput from '@/components/Inputs/DsInput.vue';
import FormStepUser from '@/components/Forms/FormStepUser.vue';
import DsRadio from "@/components/Inputs/DsRadio.vue";
import FormStepConfirm from '@/components/Forms/FormStepConfirm.vue';

import { SendData } from '@/services/RegistrationService'

import { useEmailValidation } from '@/composables/validations/EmailValidation';
import { useMinLengthValidation } from '@/composables/validations/MinlengthValidation';
import DsButton from "@/components/Button/DsButton.vue";

const { validateEmail } = useEmailValidation();
const { validateMinLength } = useMinLengthValidation();

const activeStep = ref(0);
const form = ref({
  date: '',
  document: '',
  documentType: 'PF',
  email: '',
  name: '',
  password: '',
  phone: '',
  userStepValid: true,
  confirmStepValid: false,
});
const radioList = [
  { label: 'Pessoa física', value: 'PF' },
  { label: 'Pessoa jurídica', value: 'PJ' }
];

const sending = ref(false);
const sended = ref(false);

const steps = computed(() => {
  const { value } = form;

  return [
    { title: 'Seja bem vindo(a)' },
    { title: `Pessoa ${(value.documentType === 'PF') ? 'física' : 'juridica'}` },
    { title: 'Senha de acesso' },
    { title: 'Revise suas informações' }
  ]
});

const disabledNextStep = computed(() => {
  if (activeStep.value === 0) { return !validateEmail(form.value.email); }

  if (activeStep.value === 1) { return form.value.userStepValid; }

  if (activeStep.value === 2) { return !validateMinLength(form.value.password, 6); }

  if (activeStep.value === 3) { return form.value.confirmStepValid; }

  return false;
});

const handleNextStep = () => {
  if(activeStep.value < (steps.value.length - 1)) {
    activeStep.value++;
  } else {
    handleSubmit();
  }
};

const handlePreviousStep = () => {
  if (activeStep.value > 0) { activeStep.value--; }
};

const handleUpdateForm = (value) => (form.value = { ...form.value, ...value });

const resetForm = () => {
  form.value = {
    date: '',
    document: '',
    documentType: 'PF',
    email: '',
    name: '',
    password: '',
    phone: '',
    userStepValid: true,
    confirmStepValid: false,
  }

  activeStep.value = 0;
  sended.value = false;
}

const handleSubmit = async () => {
  let { date, document, documentType, email, name, password, phone } = form.value;
  sending.value = true;

  try {
    await SendData({ date, document, documentType, email, name, password, phone });
    sended.value = true;
  } finally {
    sending.value = false;
  }
 };
</script>

<style lang="scss">
:root {
  --color-black: #000000;
  --color-black-light: #2C3E50;
  --color-danger: #FF0000;
  --color-light: #FFFFFF;
  --color-primary: #FF9624;
}

* {
  box-sizing: border-box;

  &:after,
  &:before {
    box-sizing: border-box;
  }
}

body {
  margin: 0;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
  display: inline-block;
  height: 100%;
  max-width: 100vw;
  min-height: 100vh;
  padding: .75rem;
  width: 100%;
}

.appContent {
  max-width: 35.5rem;
  margin: 2.5rem auto;

  &__sendedMessage {
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: 0.1rem;
    margin: 0.5rem 0 1.5rem;
    text-align: center;
  }
}

.gridA {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  gap: .875rem;
  margin-bottom: .875rem;
}
</style>
