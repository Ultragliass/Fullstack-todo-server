import express, { Request } from "express";
import { getUserTodos, addTodo } from "../actions/todoActions";
import { todoSchema } from "../schemas/todo";

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

router.post("/", async (req: any, res) => {
    const [{id}] = req.user;
    const todo = req.body;
    
    const result = todoSchema.validate({id, ...todo});

    if (result.error) {
        res.status(400).send(JSON.stringify({success: false, msg: result.error}));
        return;
    }

    const response = await addTodo(id, todo.description, todo.deadline);

    if (response) {
        res.send(JSON.stringify({success: true, msg: "Todo added successfully."}));
    } else {
        res.status(500).send(JSON.stringify({success: false, msg: "Oops! Something went wrong..."}));
    }
});

export { router as todos };
