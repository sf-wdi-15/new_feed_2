
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var articles = [{title: 'Lex Luthor Strikes Again!', content: 'Lex Luthor super villian strikes again!'}]

app.set('view engine', 'ejs');



app.get('/articles' , function (req, res) {
	res.render('articles/summary', {articlesList: articles});
});

app.get('/articles/new' , function (req, res) {
	res.render('articles/new');
});

app.post('/articles', function(req, res) {
	console.log(req.body);
	articles.push(req.body.article);
	res.redirect('articles');
});

app.get('/' , function (req, res) {
	res.render('site/index');
});

app.get('/site/about' , function (req, res) {
	res.render('site/about');
});

app.get('/site/contact' , function (req, res) {
	res.render('site/contact');
});




app.listen(3000, function () {
	console.log("Listening")
});

