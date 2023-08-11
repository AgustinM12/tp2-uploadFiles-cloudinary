import { checkSchema } from 'express-validator';

export const createUserSchema = checkSchema({
  nombre: {
    isLength: { min: 2 },
    errorMessage: 'Invalid name',
    isAlpha: true
  },
  
  descripcion: {
    isLength: {
      options: { min: 8 },
      errorMessage: 'Password should be at least 8 chars'
    }
  }
});
