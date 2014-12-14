var express = require("express"),
bodyParser = require("body-parser"),
methodOverride = require("method-override"),
pg = require("pg"),

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static(__dirname + '/public'))
app.set("view engine", "ejs");

var config = {
  database: "articles",
  port: 5432,
  host: "localhost"
};

app.get("/articles", function (req, res) {
	pg.connect(config, function(err, client, done) {
		if (err) {
			console.log("NOPE", err);
		}
		var statement = "SELECT * FROM articles;"
		var params = [];
		client.query(statement, params, function (err, result) {
			done();
			console.log(result.rows)
			res.render('articles/index', {articlesList: result.rows});
		});
	});
});

app.get("/articles/new", function (req, res) {
	res.render('articles/new');
});

app.get("/articles/:id", function (req, res) { // "id" in this case is the number value of a given article
	onsole.log(req.body);
  pg.connect(config, function(err, client, done){ 
        if (err) {
             console.error("YEAH RIGHT", err);
        }
        client.query("SELECT * FROM articles WHERE title=$1", function (err, result) {//client.query is sending a command to the
            //database to grab a particular item from our articles table, represented by "$1"
            done(); 
            console.log(result.rows);
            if (result.rows.length) { // basically, if there's a result to our client query at all
              res.render("articles/show", {article: result.rows[0]}); // we'll serve up our "show" page and feed in 
            // the 0 index of our "articles" table, setting it equal to the key "article"
            } else {
            res.status(404).send("Article Not Found");
            }
        });
    });

});

app.post("/articles", function (req, res) {
  console.log(req.body);

  db.article.create({
		title: req.body.article.title,
		author: req.body.article.title,
		
	})

  // pg.connect(config, function(err, client, done){
  //       var statement = "INSERT INTO articles " +
  //       				"title, author, content, fiction)" +
  // 						"VALUES ($1, $2, $3, $4) " +
  // 						"RETURNING *";
  // 		var params = [
  // 						req.body.article.title,
  // 						req.body.article.author, 
  // 						req.body.content,
  // 					]
  // 		client.query(statement, params, function (err, result) {
  //           done(); 
  //           console.log(result.rows); 
  //           var article = result.rows[0]; 
  //           res.redirect("/articles/");
  //       });
  //   });
});


app.delete("/articles/:id", function (req, res) {
  var articleId = parseInt(req.params.id); //req.params just grabs the url, and giving it ".id" tells it to look for 
  //the variable of the same name. once it has that, it passes it to parseInt, which scans it for an integer and
  //returns it by itself. we set that to the new variable "articleId".
  var articleIndex = null;
  for (var i = 0, notFound = true; i < articles.length && notFound; i+=1) { // our loop will run through every item.
    // as long as there's still items to check AND notFound is still true, it will continue.
    if (articles[i].id == articleId) { //if a particular item in "articles" is the same as "articleId"(our current page)
      notFound = false; //then set notFound to false
      articleIndex = i; //and assign articleIndex a value of "i"
    }
  }
  if (notFound) {
    res.send(404).send("Article Not Found"); //if notFound is true, respond with an error message
  } else {
    articles.splice(articleIndex, 1); //otherwise, call splice(destroy) on our articles object, and give it the 
    // only index of our new "articleIndex" variable
    res.redirect("/articles"); //send the user back to the updated articles homepage, with the selected book spliced away
  }
})

app.get("/", function (req, res) {
	res.render('site/index');
})

app.get("/about", function (req, res) {
	res.render('site/about');
})

app.get("/contact", function (req, res) {
	res.render('site/contact');
})

app.listen(3000, function () {
	console.log("LISTENING!");
});