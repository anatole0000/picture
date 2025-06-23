// middlewares/handleValidation.ts
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const handleValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      message: 'Dữ liệu gửi lên không hợp lệ',
      errors: errors.array(),
    });
    return;
  }
  next();
};
