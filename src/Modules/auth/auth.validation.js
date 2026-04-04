import joi from "joi";

export const signUpValidation = joi.object({
    role: joi.string().valid("user", "admin"),
    fullName: joi.string().min(3).max(20).required(),
    userName: joi.string().min(3).max(20).required(),
    age: joi.number().min(0).required(),
    phone: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string()
        .min(6)
        .pattern(/[A-Z]/)
        .pattern(/[!@#$%^&*(),.?":{}|<>_\-]/)
        .required()
        .messages({
            "string.min": "Password must be greater than 6 characters",
            "string.pattern.base": "The password must contain at least one capital letter and one special character.",
            "any.required": "This field is required",
            "string.empty": "Password cannot be empty"
        })
}).required();