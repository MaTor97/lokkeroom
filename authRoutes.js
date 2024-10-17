import express from 'express';
import bodyParser from 'body-parser';
import sql from "./dbConfig.js";

const app = express();

app.use(bodyParser.json());


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

export default app;