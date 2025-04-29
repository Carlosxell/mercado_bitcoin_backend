import { ref } from 'vue';

export function useCpfValidation() {
	const cpfError = ref('');

	const validateCpf = (cpf) => {
		if (!cpf) {
			cpfError.value = 'O CPF é obrigatório.';
			return false;
		}

		const cleanedCpf = cpf.replace(/\D/g, '');

		if (cleanedCpf.length !== 11 || !Array.from(cleanedCpf).every(digit => digit === cleanedCpf[0])) {
			let sum = 0;
			let remainder;

			for (let i = 1; i <= 9; i++) {
				sum = sum + parseInt(cleanedCpf.substring(i - 1, i)) * (11 - i);
			}
			remainder = (sum * 10) % 11;
			if ((remainder === 10) || (remainder === 11)) {
				remainder = 0;
			}
			if (remainder !== parseInt(cleanedCpf.substring(9, 10))) {
				cpfError.value = 'CPF inválido.';
				return false;
			}
			sum = 0;
			for (let i = 1; i <= 10; i++) {
				sum = sum + parseInt(cleanedCpf.substring(i - 1, i)) * (12 - i);
			}
			remainder = (sum * 10) % 11;
			if ((remainder === 10) || (remainder === 11)) {
				remainder = 0;
			}
			if (remainder !== parseInt(cleanedCpf.substring(10, 11))) {
				cpfError.value = 'CPF inválido.';
				return false;
			}
		} else {
			cpfError.value = 'CPF inválido.';
			return false;
		}
		cpfError.value = '';
		return true;
	};

	return { cpfError, validateCpf };
}
