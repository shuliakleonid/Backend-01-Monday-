import { NextFunction } from 'express';
import { body } from 'express-validator';
export const titleValidator = body('title').isLength({ max: 30 });
