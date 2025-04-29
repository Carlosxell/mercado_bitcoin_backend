function isValidPhone(phone) {
	if (!phone || typeof phone !== 'string') return false;
	const cleanedPhone = phone.replace(/\D/g, '');
	return (cleanedPhone.length >= 10 && cleanedPhone.length <= 11 && /^\d{2}/.test(cleanedPhone));
}

module.exports = { isValidPhone };
