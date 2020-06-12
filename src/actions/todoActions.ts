import { Todo } from "../models/Todo";
import { sql } from "../sql";
import { RowDataPacket, ResultSetHeader } from "mysql2";

/*
Generic type RowDataPacket is the interface for the mysql2 SELECT return statement.
Generic type ResultSetHeader is the interface for the mysql2 INSERT, UPDATE, and DELETE return statements.
*/

export async function getUserTodos(userId: number): Promise<Todo[]> {
  const [result] = await sql.execute<RowDataPacket[]>( "SELECT id, description, deadline, complete FROM todos WHERE userId = ?", [userId]); //Selects only the meaningful data for the user's todos.

  return result as Todo[]; //Returns the todos as their corresponding interface.
}

export async function addTodo(
  userId: number,
  description: string,
  deadline: Date
): Promise<number> {
  const [result] = await sql.execute<ResultSetHeader>(
    "INSERT INTO todos (userId, description, deadline) VALUES (?, ?, ?)",
    [userId, description, deadline]
  ); //Inserts the values of a new todo to the sql table. The id and createdAt are implemented automatically in the table.

  return result.insertId; //Returns the inserted id of the added todo.
}

export async function toggleTaskCompletion(
  todoId: number,
  id: number
): Promise<number> {
  const [result] = await sql.execute<ResultSetHeader>(
    "UPDATE todos SET complete = NOT complete WHERE id = ? AND userId = ?",
    [todoId, id]
  ); //Reverses the boolean statement (i.e true => false or false => true) for a todo completion.

  return result.affectedRows;
}

export async function deleteTodo(
  todoId: number,
  userId: number
): Promise<number> {
  const [result] = await sql.execute<ResultSetHeader>(
    "DELETE FROM todos WHERE id = ? AND userId = ?",
    [todoId, userId]
  ); //Delets a single todo, requires both the user id and the todo's id.

  return result.affectedRows;
}
