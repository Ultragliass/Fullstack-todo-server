import { register } from "./routers/register";
import { login } from "./routers/login";
import { todos } from "./routers/todos";
import { SECRET } from "./secret";
import express, { Request, Response, NextFunction } from "express";
import expressJwt from "express-jwt";
import cors from "cors";

const app = express();
const PORT: string | number = process.env.PORT || 3001;

/* 
For development, our port will be 3001.
Generally, you should add an environmental variable called PORT or SERVER_PORT.
*/

app.use(express.json()); //Middleware that parses req.body JSON parameters automatically.

app.use(cors()); //Middleware that allows access to the site from all sources.

app.use(
  expressJwt({ secret: SECRET }).unless({ path: ["/register", "/login"] })
); //Middleware that requires JWT authentication, apart from the whitelisted paths.

app.use("/register", register); //Uses our register router.

app.use("/login", login); //Uses our login router.

app.use("/todos", todos); //Uses our todo router.

app.all("/", (req, res) => {
  res.status(404).send("Were you looking for something?");
}); //Generic fallback for incorrect paths.

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);

  res.status(500).send("Oops! Something went wrong...");
}); //Error fallback in case of internal server errors.

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}.`);
}); //Server initializer.
