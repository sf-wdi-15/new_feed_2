// <!--views/articles/index.ejs-->
// <!DOCTYPE HTML>
// <html>
// <body>
// <h1>Articles index</h1>
// <% articlesList.forEach(function(article) { %>
// <div>
//   <%= article.title %>
//   <div>
//     <%= article.content %>
//   </div>
// </div>
// <% }) %>
// </body>
// </html>

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


var articles = [{title: 'Wanderer', content: 'This is an article its really good. You should read it!.'}, {title: 'Whats new in Serial!', content: 'Spoilers not going to talk about it here so I dont ruin it for others'}];

app.get('/', function(req,res) {
	res.redirect('/news');
});

app.get('/news', function(req,res) {
	pg.connect(config, function(err, client, done){
        if (err) {
             console.error("OOOPS!!! SOMETHING WENT WRONG!", err);
        }

        client.query("SELECT * FROM articles", function (err, result) {
            done(); 
            console.log(result.rows);  
            res.render("news/index", {articlesList: result.rows});         
        });

    });	
});

app.get('/news/new', function(req,res) {
  res.render('news/new');
});

app.get("/news/:id", function (req, res) {

  pg.connect(config, function(err, client, done){
        if (err) {
             console.error("OOOPS!!! SOMETHING WENT WRONG!", err);
        }

        client.query("SELECT * FROM articles WHERE id=$1", [req.params.id], function (err, result) {
        console.log(result.rows);
        done(); 

        if (result.rows.length) {
	        res.render("news/show", {article: result.rows[0]});
	        } 

	   else {
	        // read about this http://expressjs.com/api.html#res.status
	        res.status(404).send("Article Not Found");
	        }      
        });

    });
});
app.post('/news', function(req,res) {
  var newArticle = req.body.article;
  pg.connect(config, function(err, client, done){
      if (err) {
           console.error("OOOPS!!! SOMETHING WENT WRONG!", err);
      }
      client.query("INSERT INTO articles (title, content) VALUES ($1, $2) RETURNING *", [newArticle.title, newArticle.content], function (err, result) {
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