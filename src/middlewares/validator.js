const { body, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: errors.array() });
};

const registerValidation = [
  body('name')
    .notEmpty().withMessage('O nome é obrigatório')
    .isLength({ min: 3 }).withMessage('O nome deve ter pelo menos 3 caracteres'),
  body('email')
    .isEmail().withMessage('Insira um e-mail válido')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres'),
  validate
];

const loginValidation = [
  body('email')
    .isEmail().withMessage('Insira um e-mail válido')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('A senha é obrigatória'),
  validate
];

const userValidation = [
  body('name')
    .optional()
    .isLength({ min: 3 }).withMessage('O nome deve ter pelo menos 3 caracteres'),
  body('email')
    .optional()
    .isEmail().withMessage('Insira um e-mail válido')
    .normalizeEmail(),
  validate
];

module.exports = {
  registerValidation,
  loginValidation,
  userValidation
};
