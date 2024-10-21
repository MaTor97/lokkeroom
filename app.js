import express from "express";
import auth from './authRoutes.js';
import lobby from './lobbyRoutes.js'
import message from './messageRoutes.js'
import users from './userRoutes.js';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 3000;

async function checkToken(req, res, next) {
	const token = req.headers['token'];
	const secret = "secretkey"
	
	try {
	jwt.verify(token, secret)
	next();
	} catch (error) {
		res.status(401).send("User not Authorised")
	}
}

// app.use(checkToken)
app.use('/', auth);
app.use('/', lobby);
app.use('/', message);
app.use('/', users);

app.listen(PORT, (err) => {
	if (err) throw err;
	console.log(`Server listening on http://localhost:${PORT}`);
});
