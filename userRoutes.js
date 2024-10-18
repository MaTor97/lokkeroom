import express from "express";
import bodyParser from "body-parser";
import sql from "./dbConfig.js";

const app = express();

app.use(bodyParser.json());

app.get("/api/users", async (req, res) => {
	const loggedUserId = req.body.id;

	let adminId = await sql`SELECT admin_id FROM lobbies WHERE admin_id = ${loggedUserId}`;
	if (adminId.length === 0) {
		return res.status(401).send("User unauthorised");
	}

	adminId = adminId[0].admin_id;
	try {
		const result = await sql`
        SELECT u.user_id, u.username, u.email 
        FROM users u
        JOIN user_lobbies ul ON u.user_id = ul.user_id
        WHERE ul.lobby_id = ${adminId}
        `;

		res.status(200).json(result);
		res.end();
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal Server Error");
	}
});

app.get("/api/users/:user_id", async (req, res) => {
	const user_id = req.params.user_id;

	try {
		const result = await sql`SELECT user_id, username, email FROM users WHERE user_id = ${user_id}`;
		res.status(200).json(result);
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal Server Error");
	}
});

export default app;
