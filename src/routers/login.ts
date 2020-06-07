import { authorizeUser } from "../actions/userActions";
import { SECRET } from "../secret";
import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  const userDetails = await authorizeUser(username, password);

  if (!userDetails.length) {
    res.status(401).send(
      JSON.stringify({
        success: false,
        msg: "Username and password don't match.",
      })
    );
    return;
  }

  const token = jwt.sign(userDetails, SECRET);

  res.send(JSON.stringify({ success: true, token }));
});

export { router as login };
