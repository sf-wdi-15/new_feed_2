
  // <div>
  //   <h2>
  //     <a href="/news/<%= article.id %>"><%= article.title %></a>
  //   </h2>
  //   <div>
  //     <%= article.content %>
  //   </div>
  // </div>
  // <div>
  //   <form action="/news/<%= article.id %>?_method=DELETE" method="post">
  //     <button>DELETE</button>
  //   </form>
  // </div>
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

        client.query("SELECT * FROM articles", function (err, articles) 
        {
            done(); 
            displayPage(articles.rows);
            res.render("news/index", {articles: articles.rows}); 

        });

    });	
});


var displayPage = function(result)
{
	for (var i = 0; i < result.length; i += 1)
	{
		console.log(result[i].title);
	}
	//var node = this.content.document.getElementById('newsfeed');

	// node.innerHTML = "";

 //    for (var i = 0; i < result.length; i += 1)
 //    {
	// 	var newDiv = window.content.document.createElement("div");
	// 	newDiv.id = "row_" + i;
	// 	newDiv.className = "row";
	// 	document.getElementById('newsfeed').appendChild(newDiv);

	// 	newDiv = document.createElement("div");
	// 	newDiv.className = "col-sm-12 col-md-12 col-lg-12";

	// 	document.getElementById('row_'+i).appendChild(newDiv);
 //    }
};

app.get('/news/new', function(req,res) {
  res.render('news/new');
});

app.get("/news/:id", function (req, res) {

  pg.connect(config, function(err, client, done){
        if (err) {
             console.error("OOOPS!!! SOMETHING WENT WRONG!", err);
        }

        client.query("SELECT * FROM articles WHERE id=$1", [req.params.id], function (err, result) {
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