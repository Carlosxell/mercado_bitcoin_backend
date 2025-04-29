import { ref } from 'vue';

export function useNumberValidation(options = {}) {
	const numberError = ref('');
	const { required = false, min, max } = options;

	const validateNumber = (number) => {
		if (required && !number) {
			numberError.value = 'O número é obrigatório.';
			return false;
		}
		if (number !== null && number !== undefined && isNaN(Number(number))) {
			numberError.value = 'Deve ser um número válido.';
			return false;
		}
		if (min !== undefined && Number(number) < min) {
			numberError.value = `Deve ser maior ou igual a ${min}.`;
			return false;
		}
		if (max !== undefined && Number(number) > max) {
			numberError.value = `Deve ser menor ou igual a ${max}.`;
			return false;
		}
		numberError.value = '';
		return true;
	};

	return { numberError, validateNumber };
}
