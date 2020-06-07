import joi from "@hapi/joi";

export const todoSchema = joi.object({
  userId: joi.number().integer().required(),
  description: joi.string().min(1).max(500).required(),
  deadline: joi.date().required(),
});

/* 
This is the structure for our todos.
The userId is a number we get from the user's token, and is required.
The description is a string that can be between 1 and 500 characters, and is required.
The deadline is a date format, and is required.
*/
