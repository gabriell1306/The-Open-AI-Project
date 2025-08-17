"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatComppleteValidator = exports.loginValidator = exports.signupValidator = exports.validate = void 0;
const express_validator_1 = require("express-validator");
const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        const errors = (0, express_validator_1.validationResult)(req);
        if (errors.isEmpty()) {
            return next();
        }
        return res.status(422).json({ errors: errors.array() });
    };
};
exports.validate = validate;
const loginValidator = [
    (0, express_validator_1.body)("email")
        .trim()
        .isEmail()
        .notEmpty()
        .withMessage("Email is must required"),
    (0, express_validator_1.body)("password")
        .trim()
        .isLength({ min: 6 })
        .notEmpty()
        .withMessage("Password should contain atleaset 6 charactors"),
];
exports.loginValidator = loginValidator;
const signupValidator = [
    (0, express_validator_1.body)("name").notEmpty().withMessage("Name is must required"),
    ...loginValidator,
];
exports.signupValidator = signupValidator;
const chatComppleteValidator = [
    (0, express_validator_1.body)("message").notEmpty().withMessage("Name is must required"),
];
exports.chatComppleteValidator = chatComppleteValidator;
