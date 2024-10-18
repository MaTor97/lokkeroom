import express from "express";
import bodyParser from 'body-parser'
import auth from './authRoutes.js';
import lobby from './lobbyRoutes.js'
import message from './messageRoutes.js'
import users from './userRoutes.js';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', auth);
app.use('/', lobby);
app.use('/', message);
app.use('/', users);




app.listen(PORT, (err) => {
	if (err) throw err;
	console.log(`Server listening on http://localhost:${PORT}`);
});
