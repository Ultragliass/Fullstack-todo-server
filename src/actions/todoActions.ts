import { Todo } from "../models/Todo";
import { sql } from "../sql";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export async function getUserTodos(userId: number): Promise<Todo[]> {
  const [result] = await sql.execute<RowDataPacket[]>(
    "SELECT id, description, deadline, complete FROM todos WHERE userId = ?",
    [userId]
  );

  return result as Todo[];
}

export async function addTodo(
  userId: number,
  description: string,
  deadline: Date
): Promise<number> {
  const result = await sql.execute<ResultSetHeader>(
    "INSERT INTO todos (userId, description, deadline) VALUES (?, ?, ?)",
    [userId, description, deadline]
  );

  return result[0].affectedRows;
}

export async function toggleTaskCompletion(
  todoId: number,
  id: number
): Promise<number> {
  const [result] = await sql.execute<ResultSetHeader>(
    "UPDATE todos SET complete = NOT complete WHERE id = ? AND userId = ?",
    [todoId, id]
  );

  return result.affectedRows;
}
