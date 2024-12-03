const { body } = require('express-validator');

const validateStudent = [
    body('first_name')
        .isLength({ min: 2 })
        .withMessage('First name must be at least 2 characters long'),
    body('email_address')
        .isEmail()
        .withMessage('Invalid email address'),
];

module.exports = { validateStudent };
