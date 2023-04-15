import { createConnection } from "mysql2/promise";


export default async function handler(req, res) {
  const connection = await createConnection(process.env.DATABASE_URL);
  const [rows] = await connection.execute('SELECT * FROM test WHERE test.id = ?', ['119f4a6c-02f3-4f47-8103-9b5bf3b245db']);
  res.status(200).json({ rows })
}