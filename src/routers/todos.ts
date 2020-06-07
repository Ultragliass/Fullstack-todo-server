import express from "express";
import {
  getUserTodos,
  addTodo,
  toggleTaskCompletion,
  deleteTodo,
} from "../actions/todoActions";
import { todoSchema } from "../schemas/todo";

const router = express.Router();

router.get("/", async (req: any, res) => {
  const [{ username, userId }] = req.user; //The username and userId should come from the user's token.

  const todos = await getUserTodos(userId); //Runs the sql query to get all the user's todos, by his userId.

  res.send(
    JSON.stringify({
      success: true,
      userData: {
        todos,
        username,
      },
    })
  );
});

router.post("/", async (req: any, res) => {
  const [{ userId }] = req.user;
  const todo = req.body; //We expect the client to send us a todo.

  const result = todoSchema.validate({ userId, ...todo }); //Validates that the todo has the appropriate structure.

  if (result.error) {
    //If it doesn't, it sends the client the appropriate error.

    const msg = result.error.details[0].message;

    res.status(400).send(JSON.stringify({ success: false, msg }));
    return;
  }

  const response = await addTodo(userId, todo.description, todo.deadline); //Adds a new todo to the database with the user's id.

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

  const result = toggleTaskCompletion(todoId, userId); //Toggles a todo's completeion boolean value.

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
  const [{ userId }] = req.user;
  const { todoId } = req.body;

  const result = await deleteTodo(todoId, userId); //Delets a specific todo, requires both the todo's id, and the user's id.

  if (result) {
    res.send(
      JSON.stringify({ success: true, msg: "Todo deleted successfully." })
    );
  } else {
    res
      .status(500)
      .send(
        JSON.stringify({ success: false, msg: "Oops! Something went wrong..." })
      );
  }
});

export { router as todos };
