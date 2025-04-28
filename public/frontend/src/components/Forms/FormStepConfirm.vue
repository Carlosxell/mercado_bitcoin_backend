<template>
  <div class="formStepOne">
    <DsInput label="Endereço de e-mail"
             placeholder="example@gmail.com"
             type="email"
             v-model="form.email" />

    <DsInput :label="(typeDocument === 'PF') ? 'Nome' : 'Razão social'"
             placeholder="Ex: João Gomes"
             v-model="form.name" />

    <DsInput :label="(typeDocument === 'PF') ? 'CPF' : 'CNPJ'"
             :placeholder="(typeDocument === 'PF') ? '000.000.000-00' : '00.000.000/0000-00'"
             v-model="form.document" />

    <DsInput :label="`Data de ${(typeDocument === 'PF') ? 'nascimento' : 'abertura'}`"
             placeholder="Ex: 21/11/1989"
             mask="##/##/####"
             v-model="form.date" />

    <DsInput label="Telefone"
             placeholder="example@gmail.com"
             mask="(##) ####-#####"
             v-model="form.phone" />

    <DsInput label="Sua senha"
             placeholder="******"
             type="password"
             v-model="form.password" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import DsInput from '@/components/Inputs/DsInput.vue';

defineProps({
  formDefault: { default: () => {}, type: Object },
  typeDocument: { default: 'PF', type: String },
})

const emit = defineEmits(['updateForm']);

const form = ref({
  date: '',
  document: '',
  documentType: 'PF',
  email: '',
  password: '',
});

watch(() => form.value, (value) => emit('updateForm', { ...value }), { deep: true });
</script>

<style lang="scss">
.formStepOne {}
</style>
