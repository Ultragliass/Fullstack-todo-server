import express, { Request } from "express";
import { getUserTodos } from "../actions/todoActions";

const router = express.Router();

router.get("/", async (req: any, res) => {
  const [{ username, id }] = req.user;

  const todos = await getUserTodos(id);

  res.send(
    JSON.stringify({
      success: true,
      userData: {
        todos,
        username,
        id,
      },
    })
  );
});

export { router as todos };
