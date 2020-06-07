export const SECRET: string = process.env.JWT_SECRET || "test";

/* 
For development, our secret will just be "test".
Generally, you should add an environmental variable called JWT_SECRET so it won't be visible to anyone.
*/
