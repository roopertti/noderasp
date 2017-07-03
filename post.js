var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
	title: String,
	todos: [{ task: String}],
	created: Date
});

var Post = mongoose.model('Post', postSchema, 'posts');

module.exports = Post;