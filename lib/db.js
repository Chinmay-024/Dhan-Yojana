import mysql from 'mysql2/promise';

export async function query({ query, values = [] }) {
  const dbconnection = await mysql.createConnection({
    // socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: 'localhost',
    port: 3306
  });
  try {
    const [results] = await dbconnection.execute(query, values);
    console.log("Results");
    dbconnection.end();
    return results;
  } catch (error) {
    throw Error(error.message);
    return { error };
  }
}
