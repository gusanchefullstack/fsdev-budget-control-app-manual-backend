import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

const inputValidatorHandler = (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req)
    if (result.isEmpty()) {
        next()
    }
    else {
        res.json({error: result.array()})
    }
};

export default inputValidatorHandler