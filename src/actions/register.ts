import { sql } from "../sql";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export async function checkIfUserExists(username: string): Promise<boolean> {
    const [result] = await sql.execute<RowDataPacket[]>("SELECT id FROM users WHERE username = ?", [username]);

    if (result.length) {
        return true;
    }

    return false;
}

export async function addUser (username: string, password: string): Promise<any> {
    const [result] = await sql.execute<ResultSetHeader>("INSERT INTO users (username, password) VALUES (?, ?)", [username, password]);

    return result.insertId;
}