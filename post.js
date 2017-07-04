var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
	title: String,
	todo: String,
	created: Date,
	createdStr: String,
	done: Boolean
});

var Post = mongoose.model('Post', postSchema, 'posts');

module.exports = Post;