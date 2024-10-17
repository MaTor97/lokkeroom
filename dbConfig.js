import postgres from "postgres";
import dotenv from "dotenv";
dotenv.config();

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

const sql = postgres({
	host: DB_HOST,
	port: DB_PORT,
	database: DB_NAME,
	username: DB_USER,
	password: DB_PASSWORD,
	ssl: "require",
});



export default sql;
