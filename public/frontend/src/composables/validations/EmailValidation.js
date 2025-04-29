import { ref } from 'vue';

export function useEmailValidation() {
	const emailError = ref('');

	const validateEmail = (email) => {
		if (!email) {
			emailError.value = 'O e-mail é obrigatório.';
			return false;
		}
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			emailError.value = 'Formato de e-mail inválido.';
			return false;
		}
		emailError.value = '';
		return true;
	};

	return { emailError, validateEmail };
}
