import express from "express";
import {
  getUserTodos,
  addTodo,
  toggleTaskCompletion,
} from "../actions/todoActions";
import { todoSchema } from "../schemas/todo";

const router = express.Router();

router.get("/", async (req: any, res) => {
  const [{ username, userId }] = req.user;

  const todos = await getUserTodos(userId);

  res.send(
    JSON.stringify({
      success: true,
      userData: {
        todos,
        username,
        userId,
      },
    })
  );
});

router.post("/", async (req: any, res) => {
  const [{ userId}] = req.user;
  const todo = req.body;

  const result = todoSchema.validate({ userId, ...todo });

  if (result.error) {
    res.status(400).send(JSON.stringify({ success: false, msg: result.error }));
    return;
  }

  const response = await addTodo(userId, todo.description, todo.deadline);

  if (response) {
    res.send(
      JSON.stringify({ success: true, msg: "Todo added successfully." })
    );
  } else {
    res
      .status(500)
      .send(
        JSON.stringify({ success: false, msg: "Oops! Something went wrong..." })
      );
  }
});

router.put("/", async (req: any, res) => {
  const [{ userId }] = req.user;
  const { todoId } = req.body;

  const result = toggleTaskCompletion(todoId, userId);

  if (result) {
    res.send(
      JSON.stringify({ success: true, msg: "Todo toggled successfully." })
    );
  } else {
    res
      .status(500)
      .send(
        JSON.stringify({ success: false, msg: "Oops! Something went wrong..." })
      );
  }
});

router.delete("/", async (req: any, res) => {
  const [{ todoId }] = req.body;

  
});

export { router as todos };
