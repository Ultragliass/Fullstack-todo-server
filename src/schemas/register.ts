import joi from "@hapi/joi";

export const registerSchema = joi.object({
  username: joi.string().alphanum().min(4).max(20).required(),
  password: joi
    .string()
    .pattern(/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,30}$/)
    .required(),
});

/* 
This is the structure for our username and password.
The username is required, must be at least 4 alphanumerical characters, but no more than 20, in string format.
The password is required, must be at least 8 alphanumerical characters, but no more than 30, in string format,
and must contain at least one uppercase and lowercase character, and a number.
*/
