export async function SendData(body) {
	try {
		const response = await fetch('http://localhost:3000/registration', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body)
		});

		if (!response.ok) {
			throw new Error('Erro na requisição');
		}

		const result = await response.json();
		return result;
	} catch (error) {
		console.error('Erro:', error);
		return null;
	}
}
