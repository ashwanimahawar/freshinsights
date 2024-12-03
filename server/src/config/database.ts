import { Pool } from "pg";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

//connect to pg-db
const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT!) ?? 5432,
  // ssl: true,
});
db.connect().then(() => console.log("Connected to the Postgres."));

//Pinging the neon Database, as it gets disconnected after 5 mins of no interaction.
// setInterval(async () => {
//   try {
//     await db.query("SELECT 1"); // Simple query to keep the connection alive
//   } catch (error) {
//     console.error("Error pinging the database:", error);
//   }
// }, 4.5 * 60 * 1000); // Ping every 4.5 minutes

export default db;
