import { authorizeUser } from "../actions/userActions";
import { SECRET } from "../secret";
import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body; //We expect the client to send us the username and password.

  if (!username || !password) {
    res.status(400).send(JSON.stringify({success:false, msg: "Both username and password must be provided." }));
    return;
  }

  const userDetails = await authorizeUser(username, password); //Runs our sql query to see if the username and password match.

  if (!userDetails.length) { //If we get an empty array, the username and password did not match.
    res.status(401).send(
      JSON.stringify({
        success: false,
        msg: "Username and password don't match.",
      })
    );
    return;
  }

  const token = jwt.sign({...userDetails}, SECRET); //If they did match, create our token with the details we want. (userId and username)

  res.send(JSON.stringify({ success: true, token })); //We send the token to our client.
});

export { router as login };
