import mysql from "mysql2/promise";

export async function fetchQuery(query, params) {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "averyinc_siba",
    timezone: "Z",
  });

  const [rows, fields] = await connection.execute(query, params || []);

  return rows;
}
