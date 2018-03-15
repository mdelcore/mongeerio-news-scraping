// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require ('mongoose');
var path = require('path');

// scraping tools
var request = require('request');
var cheerio = require('cheerio');

// Mongo models
var Article = require('./models/Article.js');
var Comment = require('./models/Comment.js');

// Set mongoose to leverage built in JavaScript ES6 promises
mongoose.Promise = Promise;

// Express config
var app = express();
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(express.static('public'));

// MongoDB and Mongoose config
mongoose.connect('mongodb://localhost/scrapenews');
var db = mongoose.connection;
db.on('error', function(error) {
	console.log('Mongoose Error: ', error);
});
db.once('open', function() {
	console.log('Mongoose connection successful.');
});

// =======
// Routes
// =======

// Scrape data
app.get('/', function(req, res) {
	request('http://www.theonion.com/section/science-technology/', function(error, response, html) {
		var $ = cheerio.load(html);
		$('div.info').each(function(i, element) {
			var result = {};
			result.title = $(this).find('h2.headline').find('a').attr('title');
			result.desc = $(this).find('div.desc').text().trim();
			result.link = 'http://www.theonion.com' + $(this).find('figure.thumb').find('a').attr('href');
			result.thumb = $(this).find('div.image').find('img').attr('src');
			var entry = new Article(result);
			entry.save(function(err, doc) {
				if (err) {
					console.log(err);
				} else {
					console.log(doc);
				}
			});
		});
	});
});

// View one article with its comments
app.get('/article/:id', function(req, res){
	Article.findOne({
		'_id': req.params.id
	}).populate('comment').exec(function(err, doc) {
		if (err) {
			console.log(err);
		} else {
			res.json(doc);
		}
	});
});

// Create a new note
app.post('/article/:id', function(req, res) {
	console.log(req.params.id);

	var newComment = new Comment(req.body);
	newComment.save(function(err, doc) {
		console.log(doc);
		if (err) {
			console.log(err);
		} else {
			Article.findOneAndUpdate({
				'_id': req.params.id
			}, {
				$push: {
					'comment': doc._id
				}
			}, {
				new: true
			}).exec(function(err, newdoc) {
				if (err) {
					console.log(err);
				} else {
					res.json(newDoc);
				}
			});
		}
	});
		
});

//====
app.listen(3000, function() {
	console.log('App running on port 3000!');
});
