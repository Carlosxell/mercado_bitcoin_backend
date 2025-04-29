import { ref } from 'vue';

export function useDateValidation(options = {}) {
	const dateError = ref('');
	const { required = false } = options;

	const validateDate = (dateString) => {
		if (required && !dateString) {
			dateError.value = 'A data é obrigatória.';
			return false;
		}

		if (!dateString) {
			dateError.value = '';
			return true;
		}

		const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
		if (!dateRegex.test(dateString)) {
			dateError.value = 'Formato de data inválido (DD/MM/YYYY).';
			return false;
		}

		const [day, month, year] = dateString.split('/').map(Number);

		if (isNaN(day) || isNaN(month) || isNaN(year)) {
			dateError.value = 'Data inválida.';
			return false;
		}

		if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1000 || year > 9999) {
			dateError.value = 'Data inválida.';
			return false;
		}

		const daysInMonth = [0, 31, (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		if (day > daysInMonth[month]) {
			dateError.value = 'Data inválida.';
			return false;
		}

		dateError.value = '';
		return true;
	};

	return { dateError, validateDate };
}
