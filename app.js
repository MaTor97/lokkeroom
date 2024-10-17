import express from "express";
import sql from "./dbConfig.js";

const app = express();
const PORT = 3000;

app.get('/api/register', async (req, res) => {
    try {
        const users = await sql`SELECT * FROM users`;
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
    });


app.listen(PORT, (err) => {
	if (err) throw err;
	console.log(`Server listening on http://localhost:${PORT}`);
});