import { checkIfUserExists, addUser } from "../actions/userActions";
import { registerSchema } from "../schemas/register";
import express from "express";
import jwt from "jsonwebtoken";
import { SECRET } from "../secret";

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  const result = registerSchema.validate({ username, password });

  if (result.error) {
    res.status(400).send(JSON.stringify({ success: false, msg: result.error }));
    return;
  }

  if (await checkIfUserExists(username)) {
    res
      .status(409)
      .send(JSON.stringify({ success: false, msg: "User already exists." }));
    return;
  }

  const id = await addUser(username, password);

  const token = jwt.sign({username, id}, SECRET);

  res.send(JSON.stringify({success: true, token}));
});

export { router as register };
