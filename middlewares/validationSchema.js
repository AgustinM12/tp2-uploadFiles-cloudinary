import { validationResult } from "express-validator";

//verificar si hay errores
export const validationSchema = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next()
};