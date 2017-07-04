'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const moment = require('moment');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/rasp-todos');

const Post = require('./post.js');

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/', (req,res) => {
	res.sendFile('index.html');
});

app.post('/addPost', (req, res) => {
	console.log(req.body);
	
	const title = req.body.title;
	const todo = req.body.todo;
	const created = moment();
	
	const post = new Post({
		title: title,
		todo: todo,
		created: created,
		createdStr: created.format("DD.MM.YYYY HH:mm"),
		done: false
	});
	
	post.save()
	
	.then(() => {
		console.log(`${post.title} added!`);
	})
	.catch((err) => {
		console.log(`error: ${err}`);
	});
	
	res.send('request handed');
});

app.get('/getPosts', (req, res) => {
	console.log('get request');
	Post.find({})
	.then((result) => {
		const posts = {
			undone: [],
			done: []
		};
		result.forEach((post) => {
			post.done ? posts.done.push(post) : posts.undone.push(post);
		});
		res.send(posts);
	})
	.catch((err) => {
		console.log(`error: ${err}`);
	});
});

app.put('/markAsDone', (req, res) => {
	var id = req.body.postId;
	
	Post.findById(id)
	.then((post) => {
		post.done = true;
		post.save()
	})
	.then(() => {
		res.send('update successful');
	})
	.catch((err) => {
		console.log(`error ${err}`);
	});
});

app.listen(port, () => {
	console.log(`listening to ${port}`);
});
