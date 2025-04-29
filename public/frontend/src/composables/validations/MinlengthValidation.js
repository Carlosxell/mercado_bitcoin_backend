import { ref } from 'vue';

export function useMinLengthValidation(minLength) {
	const minLengthError = ref('');

	const validateMinLength = (value) => {
		if (!value) {
			minLengthError.value = `Este campo é obrigatório.`;
			return false;
		}
		if (String(value).length < minLength) {
			minLengthError.value = `Deve ter no mínimo ${minLength} caracteres.`;
			return false;
		}
		minLengthError.value = '';
		return true;
	};

	return { minLengthError, validateMinLength };
}
