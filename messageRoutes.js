import express from 'express';
import bodyParser from "body-parser";
import sql from "./dbConfig.js";

const app = express()

app.use(bodyParser.json());

app.delete('/api/message/:message_id', async  (req, res) => {
    const messageId = req.params.message_id;
    const loggedUserId = req.body.id;
    
    const messageUserId = await sql`SELECT user_id FROM messages WHERE message_id = ${messageId}`;
    if (messageUserId.length === 0) {
        return res.status(404).send("Message not found");
    }
    
    const userId = messageUserId[0].user_id; 
    if (loggedUserId !== userId) {
        return res.status(401).send("User not authorised");
    }

    try {
        await sql`DELETE FROM messages WHERE message_id = ${messageId}`;
        res.status(200).send('Message deleted')
        
    } catch (error) {
        console.error(error);
		res.status(500).send("Internal Server Error");
    }
});



export default app;


