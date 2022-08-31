import { NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const error = (req: any, res: any, next: NextFunction) => {
  const errors = validationResult(req);
  console.log('errors', errors);
  console.log({ errors: errors.array() });
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => {
      return {
        message: error.msg,
        field: error.param,
      };
    });
    return res.status(400).json(errorMessages);
  }
  next();
};
