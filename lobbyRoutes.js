import express from 'express';
import bodyParser from 'body-parser';
import sql from "./dbConfig.js";

const app = express();

app.use(bodyParser.json());


app.get('/api/lobby/:lobby_id', async (req, res) => {
    try {
        const lobby_id =  req.params.lobby_id
        const result = await sql`
            SELECT message 
            FROM messages
            WHERE lobby_id = ${lobby_id}
        `;
        console.log('Done');
        res.send(result).end();
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
    });

export default app;