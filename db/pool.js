import pg from "pg";
import "dotenv/config";
const { Pool } = pg;

export default new Pool({
  host: process.env.HOST,
  user: process.env.user,
  database: process.env.DATABASE,
  password: process.env.USER_PASSWORD,
  port: process.env.DEFAULT_PORT,
});
