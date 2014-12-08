var express = require('express');
var bodyParser = require('body-parser');
var pg = require("pg");

var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

var config = {
  database: 'articles_app',
  port: '5432',
  host: 'localhost'
};

app.get('/articles', function(req,res) {
  console.log("GET /articles");
  pg.connect(config, function (err, client, done) {
    if (err) {
      console.log(err)
    }
    var statement = "SELECT * FROM articles";
    var params = [];
    client.query(statement, params, function (err, result) {
      res.render('articles/index', {articlesList: result.rows});
      done();
    });
  });
 // res.render('articles/index', {articlesList: articles});
});

app.get('/articles/new', function(req,res) {
  res.render('articles/new');
});

app.post('/articles', function(req,res) {
  console.log(req.body);
  pg.connect(config, function (err, client, done) {
    var statement = "INSERT INTO articles " +
                      "(title,author,content,fiction) " +
                      "VALUES ($1, $2, $3, $4) " + 
                      "RETURNING *";
    var params = [
                  req.body.article.title,
                  req.body.article.author,
                  req.body.content,
                  true
                ];
    client.query(statement, params, function (err, result) {
      res.redirect("/articles");
    });
  })
});

app.get('/', function(req,res) {
  res.render('site/index.ejs');
});

app.get('/about', function(req,res) {
  res.render('site/about');
});

app.get('/contact', function(req,res) {
  res.render('site/contact');
});

app.listen(3000, function() {
  console.log('Listening');
});
