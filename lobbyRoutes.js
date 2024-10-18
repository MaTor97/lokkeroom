import express from 'express';
import bodyParser from 'body-parser';
import sql from "./dbConfig.js";

const app = express();
app.use(bodyParser.json());

// Endpoint to get messages from a specific lobby
app.get('/api/lobby/:lobby_id', async (req, res) => {
    try {
        const lobby_id = req.params.lobby_id;
        const result = await sql`
            SELECT message 
            FROM messages
            WHERE lobby_id = ${lobby_id}
        `;
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Endpoint to get a specific message from a specific lobby
app.get('/api/lobby/:lobby_id/:message_id', async (req, res) => {
    try {
        const lobby_id = req.params.lobby_id;
        const message_id = req.params.message_id;
        const result = await sql`
            SELECT message 
            FROM messages
            WHERE lobby_id = ${lobby_id} AND message_id = ${message_id}
        `;
    
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Endpoint to post a message to a specific lobby
app.post('/api/lobby/:lobby_id', async (req, res) => {
    try {
        const { message, user_id } = req.body;
        const lobby_id = req.params.lobby_id;
        const date = new Date(); // Assuming you want to insert the current date

        await sql`
            INSERT INTO messages (user_id, lobby_id, message, date)
            VALUES (${user_id}, ${lobby_id}, ${message}, ${date})
        `;

        res.send('Message sent successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Endpoint to add a user to a specific lobby and to the users table
app.post('/api/lobby/:lobby_id/add_user', async (req, res) => {
    try {
        const lobby_id = req.params.lobby_id;
        const { user_id } = req.body;

        await sql`
            INSERT INTO user_lobbies (user_id, lobby_id)
            VALUES (${user_id}, ${lobby_id});
        `;

        await sql`
            UPDATE lobbies
            SET members = members + 1
            WHERE lobby_id = ${lobby_id};
        `;

        res.send('User added to lobby, and members count updated');
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Endpoint to remove a user from a specific lobby
app.post('/api/lobby/:lobby_id/del_user', async (req, res) => {
    try {
        const lobby_id = req.params.lobby_id;
        const user_id = req.body.user_id
        await sql`
            DELETE FROM user_lobbies WHERE user_id = ${user_id};
        `;

        await sql`
            UPDATE lobbies SET members = members - 1 WHERE lobby_id = ${lobby_id};
        `;

        res.send('User removed and members count updated');
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


// Endpoint to edit message if you write it
app.patch('/api/lobby/:lobby_id/:message_id', async (req, res) => {
    try {
        const { user_id, message } = req.body;
        const lobby_id = req.params.lobby_id;
        const message_id = req.params.message_id;

        const userCheck = await sql`
            SELECT user_id
            FROM messages
            WHERE message_id = ${message_id} AND lobby_id = ${lobby_id}
        `;

        const messageOwner = userCheck[0].user_id;

        if (messageOwner !== parseInt(user_id)) {
            return res.status(403).send("Forbidden: You can only edit your own messages"+
                `\nmessageOwner: ${typeof(messageOwner)}\nuser_id: ${typeof(user_id)}`
            ).end();
        }

        await sql`
            UPDATE messages
            SET message = ${message}
            WHERE message_id = ${message_id} AND lobby_id = ${lobby_id}
        `;
        res.send('Message updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


export default app;
