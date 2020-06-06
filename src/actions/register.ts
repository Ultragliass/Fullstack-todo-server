import { sql } from "../sql";
import { RowDataPacket } from "mysql2";

export async function checkIfUserExists(username: string): Promise<boolean> {
    const [result] = await sql.execute<RowDataPacket[]>("SELECT id FROM users WHERE username = ?", [username]);

    if (result.length) {
        return true;
    }

    return false;
}