import { sql } from "../sql";
import { Todo } from "../models/Todo";
import { RowDataPacket } from "mysql2";

export async function getUserTodos(userId: number){
    const [result] = await sql.execute<RowDataPacket[]>("SELECT id, description, deadline, complete FROM todos WHERE userId = ?", [userId]);

    console.log(result)
    
    return result as Todo[];
}