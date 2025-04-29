function isValidCPF(cpf) {
	if (!cpf || typeof cpf !== 'string') return false;
	cpf = cpf.replace(/[^\d]+/g, '');
	if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
	cpf = cpf.split('');
	const validator = cpf.filter((digit, index, array) => index >= array.length - 2 && digit).map(Number);
	const toValidate = (pop) => cpf.filter((digit, index, array) => index < array.length - pop && digit).map(Number);
	const reducer = (accumulator, currentValue, index, array) => (
		accumulator + currentValue * (array.length + 1 - index)
	);
	const result = (digits) => (digits % 11 < 2 ? 0 : 11 - (digits % 11));
	return result(toValidate(2).reduce(reducer, 0)) === validator[0]
		&& result(toValidate(1).reduce(reducer, 0)) === validator[1];
}

function isValidCNPJ(cnpj) {
	if (!cnpj || typeof cnpj !== 'string') return false;
	cnpj = cnpj.replace(/[^\d]+/g, '');
	if (cnpj.length !== 14 || !!cnpj.match(/(\d)\1{13}/)) return false;
	cnpj = cnpj.split('').map(Number);
	const t = cnpj.length - 2;
	const d = cnpj.slice(0, t);
	const d1 = d.reduce((acc, v, i) => (
		acc + v * (t - i) % 8 + 2 * (t - i) % 9
	), 0) % 11 % 10;
	const d2 = d.concat(d1).reduce((acc, v, i) => (
		acc + v * (t + 1 - i) % 8 + 2 * (t + 1 - i) % 9
	), 0) % 11 % 10;
	return String(d1) === String(cnpj[t]) && String(d2) === String(cnpj[t + 1]);
}

module.exports = { isValidCPF, isValidCNPJ };
