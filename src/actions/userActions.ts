import { sql } from "../sql";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export async function checkIfUserExists(username: string): Promise<boolean> {
  const [result] = await sql.execute<RowDataPacket[]>(
    "SELECT id FROM users WHERE username = ?",
    [username]
  ); //Returns the id of a user, used only to check if a user already exists.

  if (result.length) {
    //If the query returns a result, the user already exists.
    return true;
  }

  return false;
}

export async function addUser(
  username: string,
  password: string
): Promise<number> {
  const [result] = await sql.execute<ResultSetHeader>(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, password]
  ); //Adds a new user to the sql table, the id is set automatically in the database.

  return result.insertId;
}

export async function authorizeUser(
  username: string,
  password: string
): Promise<RowDataPacket> {
  const [[result]] = await sql.execute<RowDataPacket[]>(
    "SELECT id AS userId, username FROM users WHERE username = ? AND password = ?",
    [username, password]
  ); //Returns the id and username of a user, if their username and password match;

  /* 
  Now, why would we return the username if we already have it?
  Sql is case insensitive, meaning if your username, is "Test", and you try logging in as "tEsT", it will work.
  But we want the username that will appear on the client to be the same one registered with, the one saved in our database.
  So we receive the original username from the database and use it instead.
  */

  return result;
}
