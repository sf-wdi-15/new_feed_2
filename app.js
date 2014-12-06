var express = require("express"),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override"),
  pg = require("pg"),
  app = express();

  app.use(bodyParser.urlencoded({extended: true}));

app.use(methodOverride("_method"));
app.set("view engine", "ejs");

app.get("/articles", function (req, res) {
	res.render("articles/index.ejs");
});

app.get("/articles/new", function (req, res) {
	res.render("articles/new.ejs");
});


app.listen(3000, function () {
  console.log(new Array(51).join("*"));
  console.log("\t LISTENING ON: \n\t\t localhost:3000");
  console.log(new Array(51).join("*")); 
});