<template>
  <div class="formStepOne">
    <DsInput :label="(typeDocument === 'PF') ? 'Nome' : 'Razão social'"
             placeholder="Ex: João Gomes"
             v-model="form.name" />

    <DsInput :label="(typeDocument === 'PF') ? 'CPF' : 'CNPJ'"
             :mask="(typeDocument === 'PF') ? '###.###.###-##' : '##.###.###/####-##'"
             :placeholder="(typeDocument === 'PF') ? '000.000.000-00' : '00.000.000/0000-00'"
             v-model="form.document" />

    <DsInput :label="`Data de ${(typeDocument === 'PF') ? 'nascimento' : 'abertura'}`"
             placeholder="Ex: 21/11/1989"
             mask="##/##/####"
             v-model="form.date" />

    <DsInput label="Telefone"
             placeholder="(00) 0000-00000"
             mask="###########"
             v-model="form.phone" />
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import DsInput from '@/components/Inputs/DsInput.vue';

import { useMinLengthValidation } from '@/composables/validations/MinlengthValidation';
import { usePhoneValidation } from '@/composables/validations/PhoneValidation';
import { useCpfValidation } from "@/composables/validations/CPFValidation";
import { useCnpjValidation } from '@/composables/validations/CNPJValidation';
import { useDateValidation } from '@/composables/validations/DateValidation';

const props = defineProps({
  formDefault: { default: () => {}, type: Object },
  typeDocument: { default: 'PF', type: String },
})

const { validateMinLength } = useMinLengthValidation();
const { validatePhone } = usePhoneValidation();
const { validateCpf } = useCpfValidation();
const { validateCnpj } = useCnpjValidation();
const { validateDate } = useDateValidation();

const emit = defineEmits(['updateForm']);

const form = ref({
  date: '',
  document: '',
  name: '',
  phone: '',
});

onMounted(() => {
  const { date = '', document = '', name = '', phone = '' } = props.formDefault;
  form.value = { ...form.value, date, document, name, phone };
});

watch(() => form.value, (newValue) => {
  const userStepValid = validateMinLength(newValue.name, 3) &&
                        validateMinLength(newValue.document, 11) &&
                        validateDate(newValue.date, 11) &&
                        validatePhone(newValue.phone) && (props.typeDocument === 'PF' ? validateCpf(newValue.document) : validateCnpj(newValue.document));

  emit('updateForm', { ...newValue, userStepValid: !userStepValid });
}, { deep: true });
</script>

<style lang="scss">
.formStepOne {}
</style>
