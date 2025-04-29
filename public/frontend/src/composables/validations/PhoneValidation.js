import { ref } from 'vue';

export function usePhoneValidation() {
	const phoneError = ref('');

	const validatePhone = (phone) => {
		if (!phone) {
			phoneError.value = 'O telefone é obrigatório.';
			return false;
		}
		const cleanedPhone = phone.replace(/\D/g, '');
		if (cleanedPhone.length < 10 || cleanedPhone.length > 11) {
			phoneError.value = 'Formato de telefone inválido (DDD + número).';
			return false;
		}
		phoneError.value = '';
		return true;
	};

	return { phoneError, validatePhone };
}
