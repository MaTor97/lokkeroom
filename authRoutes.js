import express from "express";
import bodyParser from "body-parser";
import sql from "./dbConfig.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();
const salt = bcrypt.genSaltSync(10);
const API_KEY = process.env.API_KEY;

app.use(bodyParser.json());

app.post("/api/register", async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const hash = bcrypt.hashSync(password, salt);
        await sql`
            INSERT INTO users (username, password, email)
            VALUES (${username}, ${hash}, ${email})
            RETURNING *;
        `;
        res.status(200).send('User registered');
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/api/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await sql`
            SELECT user_id, username, password
            FROM users
            WHERE username = ${username}
        `;
        if (user.length === 0) {
            return res.status(404).send("User not found");
        }
        const validPassword = await bcrypt.compare(password, user[0].password);
        if (!validPassword) {
            return res.status(401).send("Invalid password");
        }
        const token = jwt.sign({ id: user[0].user_id, username: user[0].username }, API_KEY, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

export default app;
