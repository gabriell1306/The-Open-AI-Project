import { NextFunction, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        break;
      }
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    return res.status(422).json({ errors: errors.array() });
  };
};

const loginValidator = [
  body("email")
    .trim()
    .isEmail()
    .notEmpty()
    .withMessage("Email is must required"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .notEmpty()
    .withMessage("Password should contain atleaset 6 charactors"),
];

const signupValidator = [
  body("name").notEmpty().withMessage("Name is must required"),
  ...loginValidator,
];

const chatComppleteValidator = [
  body("message").notEmpty().withMessage("Name is must required"),
];

export { validate, signupValidator, loginValidator, chatComppleteValidator };
