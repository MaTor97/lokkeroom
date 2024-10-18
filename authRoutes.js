import express from "express";
import bodyParser from "body-parser";
import sql from "./dbConfig.js";

const app = express();

app.use(bodyParser.json());

app.post("/api/register", async (req, res) => {
	try {
		const { username, password, email } = req.body;
		await sql`
            INSERT INTO users (username, password, email)
            VALUES (${username}, ${password}, ${email})
            RETURNING *;
        `;
        console.log('Done');
        res.end();
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
    });

app.post("/api/login", async (req, res) => {
	try {
		const { username, password } = req.body;
        const user = await sql`
            SELECT username, password
            FROM users
            WHERE username = ${username}
        `;
        if (user.length === 0) {
            return res.status(404).send("User not found");
        }

        if (user[0].password !== password) {
            return res.status(401).send("Invalid password");
        }

        res.status(200).send("Login successful");

	} catch (error) {
		console.error(error);
		res.status(500).send("Internal Server Error");
	}
});

export default app;
