import Joi from "joi";
import APIError from "../apiError.js";

const userValidate = async (userData) => {
  const Schema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
      "string.empty": "Name is required",
      "string.min": "Name should have at least 3 characters",
      "string.max": "Name should not exceed 30 characters",
    }),

    emailId: Joi.string().email().required().messages({
      "string.email": "Invalid email format",
      "string.empty": "Email is required",
    }),

    password: Joi.string().min(8).max(20).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password should have at least 8 characters",
      "string.max": "Password should not exceed 20 characters",
    }),

    role: Joi.string().valid("Student", "Institute").required().messages({
      "any.only": "Role must be either 'student', 'admin', or 'teacher'",
      "string.empty": "Role is required",
    }),
  });

  try {
    return await Schema.validate(userData);
  } catch (error) {
    throw new APIError("validation Failed", 400);
  }
};

const loginValidate = async (userData) => {
  const Schema = Joi.object({
    emailId: Joi.string().email().required().messages({
      "string.email": "Invalid email format",
      "string.empty": "Email is required",
    }),

    password: Joi.string().min(8).max(20).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password should have at least 8 characters",
      "string.max": "Password should not exceed 20 characters",
    }),
  });

  try {
    return await Schema.validateAsync(userData);
  } catch (error) {
    throw new APIError("Validation Failed: " + error.message, 400);
  }
};

export { userValidate, loginValidate };
