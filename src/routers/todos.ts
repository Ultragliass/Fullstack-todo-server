import express, { Request } from "express";
import jwt from "express-jwt";

const router = express.Router();

router.get("/", (req: any, res) => {
  const userDetails = req.user;

  res.send(userDetails);
});

export { router as todos };
