import { checkIfUserExists, addUser } from "../actions/userActions";
import { registerSchema } from "../schemas/register";
import { SECRET } from "../secret";
import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body; //We expect the client to send us a username and password.

  const result = registerSchema.validate({ username, password }); //Validates that the username and password is structured appropriately.

  if (result.error) {
    //If they aren't, we respond to the client with the appropriate error.

    const msg = result.error.details[0].message;

    res.status(400).send({ success: false, msg });
    return;
  }

  if (await checkIfUserExists(username)) {
    //Checks if the username already exists.
    res.status(409).send({ success: false, msg: "User already exists." });
    return;
  }

  const userId = await addUser(username, password); //Adds the user to the database.

  const token = jwt.sign({ username, userId }, SECRET); //Creates a token for the client with the appropriate data. (userId and username)

  res.send({ success: true, token });
});

export { router as register };
