var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
	title: {
		type: String,
		unique: true,
		required: true
	},
	desc: {
		type: String,
		required: true
	},
	link: {
		type: String,
		required: true
	},
	thumb: {
		type: String
	},
	comment: {
		type: Schema.Type.ObjectId,
		ref: 'Comment'
	}
});

var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article; 