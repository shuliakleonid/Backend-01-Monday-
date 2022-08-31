import { NextFunction } from 'express';
import { body } from 'express-validator';
export const contentValidator = body('content').isLength({ max: 1000 }).notEmpty();
