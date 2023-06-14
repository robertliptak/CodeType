import Joi from "joi";

const userValidationSchema = Joi.object({
  username: Joi.string().alphanum().min(1).max(20).required().messages({
    "string.base": "Username should be a string",
    "string.empty": "Username is required",
    "string.alphanum": "Username should only contain alphanumeric characters",
    "string.min": "Username should have a minimum length of 1",
    "string.max": "Username should have a maximum length of 20",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email should be a string",
    "string.empty": "Email is required",
    "string.email": "Email should be a valid email address",
  }),
  password: Joi.string()
    .min(8)
    .max(64)
    .regex(/^(?=.*\d)(?=.*[A-Z])[A-Za-z\d@$!%*?&]*$/)
    .required()
    .messages({
      "string.base": "Password should be a string",
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password cannot be longer than 64 characters",
      "string.pattern.base":
        "Password must contain at least 1 capital letter and 1 number",
    }),
});

export default userValidationSchema;
