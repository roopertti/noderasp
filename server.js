'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const moment = require('moment');
const mongoose = require('mongoose');
mognoose.Promise = global.Promise;

mongoose.connect('mongodb://rasp:raspi@ds147052.mlab.com:47052/rasp-todos');

const Post = require('./post.js');

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/', (req,res) => {
	res.sendFile('index.html');
});

app.post('/addPost', (req, res) => {
	console.log('post request');
	
	const title = req.body.title;
	const todos = req.body.todos;
	
	const post = new Post({
		title: title,
		todos: todos,
		created: moment()
	});
	
	post.save()
	
	.then(() => {
		console.log(`${post.title} added!`);
	})
	.catch((err) => {
		console.log(`error: ${err}`);
	});
	
});

app.get('/getPosts', (req, res) => {
	console.log('get request');
	Post.find({})
	.then((result) => {
		console.log(result);
	})
	.catch((err) => {
		console.log(`error: ${err}`);
	});
});

app.listen(port, () => {
	console.log(`listening to ${port}`);
});