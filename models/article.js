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
	tsummary: {
    type: String,
  },
   byline: {
   type: String,
  },
  // This only saves one note's ObjectId, ref refers to the Note model
  note: [{
    type: Schema.Types.ObjectId,
    ref: "Note"
  }]
});

// Create the Article model with the ArticleSchema
var Article = mongoose.model("Article", ArticleSchema);

// Export the model
module.exports = Article;