// middlewares/validation.ts
import { body } from 'express-validator';

export const validateSubmitAnswer = [
  body('exerciseId')
    .notEmpty().withMessage('exerciseId không được để trống')
    .isString().withMessage('exerciseId phải là string'),
  body('selected')
    .notEmpty().withMessage('selected không được để trống')
    .isString().withMessage('selected phải là string'),
];
