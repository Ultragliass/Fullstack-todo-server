import { checkIfUserExists } from "../actions/register";
import { registerSchema } from "../schemas/register";
import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  if (await checkIfUserExists(username)) {
    res
      .status(409)
      .send(JSON.stringify({ success: false, msg: "User already exists." }));
    return;
  }

  const result = registerSchema.validate({ username, password });

  if (result.error) {
    res.status(400).send(JSON.stringify({ success: false, msg: result.error }));
    return;
  }
});

export {router as register};
