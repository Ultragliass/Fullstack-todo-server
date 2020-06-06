import {register} from "./routers/register";
import express, { Errback } from "express";
import expressJwt from "express-jwt";
import cors from "cors";
import { SECRET } from "./secret";
import { login } from "./routers/login";

const app = express();
const PORT: string | number = process.env.PORT || 3001;

app.use(express.json());

app.use(cors());

app.use(
  expressJwt({ secret: SECRET }).unless({ path: ["/register", "/login"] })
);

app.use("/register", register);

app.use("/login", login);

app.all("/", (req, res) => {
  res.status(404).send("Were you looking for something?");
});

app.use((err: Errback, req: any, res: any, next: any) => {
  console.log(err);

  res.status(500).send("Oops! Something went wrong...");
});

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}.`);
});
