import express from "express";
import sql from "./dbConfig.js";
import bodyParser from 'body-parser'

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/register', async (req, res) => {
    try {
        const { username, password, email } = req.body;
        await sql`
            INSERT INTO users (username, password, email)
            VALUES (${username}, ${password}, ${email})
            RETURNING *;
        `;
        console.log('Done');
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
    });


app.listen(PORT, (err) => {
	if (err) throw err;
	console.log(`Server listening on http://localhost:${PORT}`);
});