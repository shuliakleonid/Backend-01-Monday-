import { NextFunction } from 'express';
import { body } from 'express-validator';
export const descriptionValidator = body('shortDescription').isLength({
  max: 100,
});
