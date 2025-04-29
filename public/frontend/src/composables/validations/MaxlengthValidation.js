import { ref } from 'vue';

export function useMaxLengthValidation(maxLength) {
	const maxLengthError = ref('');

	const validateMaxLength = (value) => {
		if (value && String(value).length > maxLength) {
			maxLengthError.value = `Deve ter no máximo ${maxLength} caracteres.`;
			return false;
		}
		maxLengthError.value = '';
		return true;
	};

	return { maxLengthError, validateMaxLength };
}
