import joi from '@hapi/joi';

export const todoSchema = joi.object({
    id: joi.number().integer().required(),
    description: joi.string().min(1).max(500).required(),
    deadline: joi.date().required(),
});