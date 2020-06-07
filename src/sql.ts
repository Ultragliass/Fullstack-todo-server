import mysql from "mysql2/promise";

export const sql = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "todo",
});

/*
Creates the sql pool to our Mysql server.
User and password should be your own Mysql login info.
*/
