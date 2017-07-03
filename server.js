const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const moment = require('moment');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/', (req,res) => {
	res.sendFile('index.html');
});

app.post('/addPost', (req, res) => {
	console.log('post request');
});

app.get('/getPosts', (req, res) => {
	console.log('get request');
});

app.listen(port, () => {
	console.log(`listening to ${port}`);
});