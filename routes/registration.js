const express = require('express');
const path = require('path');
const router = express.Router();

const { body, validationResult } = require('express-validator');
const { isValidCPF, isValidCNPJ } = require('../utils/DocumentValidator');
const { isValidEmail } = require('../utils/EmailValidator');
const { isValidPhone } = require('../utils/PhoneValidator');

router.use(express.json());

/*
const APP = require('../src/app.js');
const template = require('../src/template.js');
const { createApp } = require('vue');
const { renderToString } = require('vue/server-renderer');
*/

router.get('/', async (req, res, next) => {
	res.sendFile(path.join(__dirname, '../public/frontend/dist', 'index.html'));
});

router.post('/', [
	body('date').notEmpty()
		.withMessage('A data é obrigatória.').matches(/^(\d{2})\/(\d{2})\/(\d{4})$/)
		.withMessage('Formato de data inválido (DD/MM/YYYY).').custom((value) => {
		const [day, month, year] = value.split('/').map(Number);
		if (isNaN(day) || isNaN(month) || isNaN(year) || day < 1 || day > 31 || month < 1 || month > 12 || year < 1000 || year > 9999) {
			throw new Error('Data inválida.');
		}
		const daysInMonth = [0, 31, (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		if (day > daysInMonth[month]) {
			throw new Error('Data inválida.');
		}
		return true;
	}),
	body('document').notEmpty().withMessage('O documento é obrigatório.').custom((value, { req }) => {
		if (req.body.documentType === 'PF' && !isValidCPF(value)) {
			throw new Error('CPF inválido.');
		}
		if (req.body.documentType === 'PJ' && !isValidCNPJ(value)) {
			throw new Error('CNPJ inválido.');
		}
		return true;
	}),
	body('documentType').isIn(['PF', 'PJ']).withMessage('O tipo de documento deve ser "PF" ou "PJ".'),
	body('email').notEmpty().withMessage('O e-mail é obrigatório.').isEmail().withMessage('Formato de e-mail inválido.').withMessage('Formato de e-mail inválido (validação customizada).'),
	body('name').notEmpty().withMessage('O nome é obrigatório.').isLength({ min: 3 }).withMessage('O nome deve ter no mínimo 3 caracteres.'),
	body('password').notEmpty().withMessage('A senha é obrigatória.'),
	// body('phone').notEmpty().withMessage('O telefone é obrigatório.').custom(isValidPhone).withMessage('Formato de telefone inválido (celular ou residencial com DDD).'),
], (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	res.status(200).json({ message: 'Objeto validado com sucesso!', data: req.body });
});

module.exports = router;
