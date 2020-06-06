import { sql } from "../sql";

export async function checkIfUserExists(username: string): Promise<boolean> {
    const [result]: any = sql.execute("SELECT id FROM users WHERE username = ?", [username]);

    if (result.length) {
        return true;
    }

    return false;
}