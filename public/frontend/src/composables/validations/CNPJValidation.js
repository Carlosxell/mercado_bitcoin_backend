import { ref } from 'vue';

export function useCnpjValidation() {
	const cnpjError = ref('');

	const validateCnpj = (cnpj) => {
		if (!cnpj) {
			cnpjError.value = 'O CNPJ é obrigatório.';
			return false;
		}
		const cleanedCnpj = cnpj.replace(/\D/g, '');
		if (cleanedCnpj.length !== 14 || !Array.from(cleanedCnpj).every(digit => digit === cleanedCnpj[0])) {
			let weight = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
			let sum = 0;
			for (let i = 12; i >= 0; i--) {
				sum += parseInt(cleanedCnpj.substring(i, i + 1)) * weight[i];
			}
			let remainder = (sum % 11);
			let digit1 = remainder < 2 ? 0 : 11 - remainder;
			if (digit1 !== parseInt(cleanedCnpj.substring(12, 13))) {
				cnpjError.value = 'CNPJ inválido.';
				return false;
			}
			weight = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
			sum = 0;
			for (let i = 13; i >= 0; i--) {
				sum += parseInt(cleanedCnpj.substring(i, i + 1)) * weight[i];
			}
			remainder = (sum % 11);
			let digit2 = remainder < 2 ? 0 : 11 - remainder;
			if (digit2 !== parseInt(cleanedCnpj.substring(13, 14))) {
				cnpjError.value = 'CNPJ inválido.';
				return false;
			}
		} else {
			cnpjError.value = 'CNPJ inválido.';
			return false;
		}
		cnpjError.value = '';
		return true;
	};

	return { cnpjError, validateCnpj };
}
