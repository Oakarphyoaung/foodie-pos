import { Pool } from "pg";

export const db = new Pool({
  host: "localhost",
  user: "postgres",
  password: "oakar123",
  database: "foodie_pos_db",
  port: 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
