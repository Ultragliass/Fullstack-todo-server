import joi from '@hapi/joi';

export const registerSchema = joi.object({
    username: joi.string().alphanum().min(4).max(20).required(),
    password: joi.string().pattern(/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/).required(),
});