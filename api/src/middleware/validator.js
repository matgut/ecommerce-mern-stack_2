const { check, validationResult } = require('express-validator');


exports.signupValidator = [
    check('username').not().isEmpty().trim().withMessage('all fields required'),
    check('email').isEmail().normalizeEmail().withMessage('invalid email'),
    check('password').isLength({min:6}).withMessage('Password must be at least 6 characters long')
];

exports.signinValidator = [
    check('email').isEmail().normalizeEmail().withMessage('invalid email'),
    check('password').isLength({min:6}).withMessage('Password must be at least 6 characters long')
];

exports.validatorResult = (req, res, next) => {
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();

    if(hasErrors) {
        const msgError = result.array()[0].msg;

        return res.status(400).json({
            code: 1,
            status: 'Error',
            message: msgError 
        });
    }

    next();
}