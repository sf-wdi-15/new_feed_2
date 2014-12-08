
var express = require("express"),
	bodyParser = require("body-parser"),
	methodOverride = require("method-override"),
	pg = require("pg"),
	app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

var config = {
  database: "dailyplanet",
  port: 5432,
  host: "localhost"
};


var articles = [];

app.get('/', function(req,res) {
	res.redirect('/news');
});

app.get('/news', function(req,res) 
{
	pg.connect(config, function(err, client, done)
	{
    if (err) 
    {
         console.error("OOOPS!!! SOMETHING WENT WRONG!", err);
    }

    client.query("SELECT * FROM articles;", function (err, articles) 
    {
      res.render("news/index", {articles: articles.rows}); 
    });

    done();
  });
});

app.get('/news/new', function(req,res) {
  res.render('news/new');
});


app.get("/news/:id", function (req, res) 
{
  pg.connect(config, function(err, client, done)
  {
    if (err) 
    {
       console.error("OOOPS!!! SOMETHING WENT WRONG!", err);
    }

    else
    {
      client.query("SELECT * FROM articles WHERE id=$1", [req.params.id], function (err, result) 
      {
        done(); 

        if (result.rows[0]) 
        {
          res.render("news/show", {article: result.rows[0]});
        } 

        else 
        {
          res.status(404).send("Article Not Found");
        }      
      });
    }
  });
});

//need to change add div to make inputting into db faster
//add image to table so i can show the background
//

app.post('/news', function(req,res) {
  var newArticle = req.body.article;
  pg.connect(config, function(err, client, done){
      if (err) {
           console.error("OOOPS!!! SOMETHING WENT WRONG!", err);
      }
      client.query("INSERT INTO articles (title, content, imgurl, summary) VALUES ($1, $2, $3, $4) RETURNING *", [newArticle.title, newArticle.content, newArticle.imgurl, newArticle.summary], function (err, result) {
          done(); 
          var article = result.rows[0];   
          res.redirect("/news/" + article.id);      
      });
  });
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