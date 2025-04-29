<template>
  <div class="formStepOne">
    <DsInput :disabled="disabledForm"
             label="Endereço de e-mail"
             placeholder="example@gmail.com"
             type="email"
             v-model="form.email" />

    <DsInput :disabled="disabledForm"
             :label="(typeDocument === 'PF') ? 'Nome' : 'Razão social'"
             placeholder="Ex: João Gomes"
             v-model="form.name" />

    <DsInput :disabled="disabledForm"
             :label="(typeDocument === 'PF') ? 'CPF' : 'CNPJ'"
             :mask="(typeDocument === 'PF') ? '###.###.###-##' : '##.###.###/####-##'"
             :placeholder="(typeDocument === 'PF') ? '000.000.000-00' : '00.000.000/0000-00'"
             v-model="form.document" />

    <DsInput :disabled="disabledForm"
             :label="`Data de ${(typeDocument === 'PF') ? 'nascimento' : 'abertura'}`"
             placeholder="Ex: 21/11/1989"
             mask="##/##/####"
             v-model="form.date" />

    <DsInput :disabled="disabledForm"
             label="Telefone"
             placeholder="(00) 0000-00000"
             mask="###########"
             v-model="form.phone" />

    <DsInput :disabled="disabledForm"
             label="Sua senha"
             placeholder="******"
             type="password"
             v-model="form.password" />
  </div>
</template>

<script setup>
import {onMounted, ref, watch} from 'vue';
import DsInput from '@/components/Inputs/DsInput.vue';

import { useEmailValidation } from '@/composables/validations/EmailValidation';
import { useMinLengthValidation } from '@/composables/validations/MinlengthValidation';
import { usePhoneValidation } from '@/composables/validations/PhoneValidation';
import { useCpfValidation } from "@/composables/validations/CPFValidation";
import { useCnpjValidation } from '@/composables/validations/CNPJValidation';
import { useDateValidation } from '@/composables/validations/DateValidation';

const props = defineProps({
  disabledForm: { default: false, type: Boolean },
  formDefault: { default: () => {}, type: Object },
  typeDocument: { default: 'PF', type: String },
})

const { validateMinLength } = useMinLengthValidation();
const { validatePhone } = usePhoneValidation();
const { validateCpf } = useCpfValidation();
const { validateCnpj } = useCnpjValidation();
const { validateDate } = useDateValidation();
const { validateEmail } = useEmailValidation();

const emit = defineEmits(['updateForm']);

const form = ref({
  date: '',
  document: '',
  email: '',
  name: '',
  password: '',
  phone: '',
});

onMounted(() => {
  const { date = '', document = '', name = '', phone = '', email = '', password = ''} = props.formDefault;
  form.value = { ...form.value, date, document, name, phone, email, password };
});

watch(() => form.value, (value) => {
  const confirmStepValid =
      validateMinLength(value.name, 3) &&
      validateMinLength(value.document, 11) &&
      validateMinLength(value.password, 6) &&
      validateEmail(form.value.email) &&
      validateDate(value.date, 11) &&
      validatePhone(value.phone) && (props.typeDocument === 'PF' ? validateCpf(value.document) : validateCnpj(value.document));
  emit('updateForm', { ...value, confirmStepValid: !confirmStepValid })
}, { deep: true });
</script>

<style lang="scss">
.formStepOne {}
</style>
