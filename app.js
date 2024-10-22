import express from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

import auth from './authRoutes.js';
import lobby from './lobbyRoutes.js'
import message from './messageRoutes.js'
import users from './userRoutes.js';


const app = express();
const PORT = 3000;

async function checkToken(req, res, next) {
	const token = req.headers['token'];
	const secret = process.env.API_KEY;

	try {
	jwt.verify(token, secret)
	next();
	} catch (error) {
		res.status(401).send("User not Authorised")
	}
}

app.use('/', auth);

app.use(checkToken)
app.use('/', lobby);
app.use('/', message);
app.use('/', users);

app.listen(PORT, (err) => {
	if (err) throw err;
	console.log(`Server listening on http://localhost:${PORT}`);
});
