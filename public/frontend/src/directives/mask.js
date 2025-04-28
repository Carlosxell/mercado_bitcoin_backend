function applyMask(el, mask) {
	let value = el.value.replace(/\D/g, '');
	let maskedValue = '';
	let i = 0;
	let vIndex = 0;

	while (i < mask.length && vIndex < value.length) {
		if (mask[i] === '#') {
			maskedValue += value[vIndex];
			vIndex++;
		} else {
			maskedValue += mask[i];
		}
		i++;
	}

	el.value = maskedValue;

	el.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
}

export default {
	mounted(el, binding) {
		const mask = binding.value;
		if (mask) {
			el.addEventListener('input', () => applyMask(el, mask));
			if (el.value) { applyMask(el, mask); }
		}
	},
	updated(el, binding) {
		const newMask = binding.value;
		const oldMask = binding.oldValue;
		if (newMask !== oldMask && newMask) { applyMask(el, newMask); }
	}
};
