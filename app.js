var express = require("express"),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override"),
  pg = require("pg"),
  app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.use(methodOverride("_method"));
app.set("view engine", "ejs");

var config = {
  database: "articles_app",
  port: 5432,
  host:"localhost"
};

app.get("/articles", function (req, res) {
   pg.connect(config, function(err, client, done){
        if (err) {
             console.error("OOOPS!!! SOMETHING WENT WRONG!", err);
        }
        client.query("SELECT * FROM articles", function (err, result) {
            done(); 
            console.log(result.rows);  
            res.render("articles/index", {articleList: result.rows});         
        });

    });
});

app.get("/articles/new", function (req, res) {
  res.render("articles/new");
});

app.get("/articles/:id", function (req, res) {
  pg.connect(config, function(err, client, done){
        if (err) {
            console.error("OOOPS!!! SOMETHING WENT WRONG!", err);
        }
        client.query("SELECT * FROM articles WHERE id=$1", [req.params.id], function (err, result) {
            done(); 
            console.log(result.rows); 
            if (result.rows.length) {
              res.render("articles/show", {article: result.rows[0]});
            } else {
              res.status(404).send("Article Not Found");
            }
          });
        });
  });

app.post("/articles", function (req, res) {
  var newArticle = req.body.article;
    pg.connect(config, function(err, client, done){
        if (err) {
             console.error("OOOPS!!! SOMETHING WENT WRONG!", err);
        }
        client.query("INSERT INTO articles (title, author, content) VALUES ($1, $2, $3) RETURNING *", [newArticle.title, newArticle.author, newArticle.content], function (err, result) {
            done(); 
            console.log(result.rows);  
            var article = result.rows[0];   
            res.redirect("/articles/" + article.id);   
        });

      });
  
});

app.delete("/articles/:id", function (req, res) {
  pg.connect(config, function(err, client, done) {
    if (err) {
      console.error("OOOPS!!! SOMETHING WENT WRONG!", err);
    }
    client.query("DELETE FROM articles WHERE id=$1", [req.params.id], function (err, result) {
      res.redirect("/articles");
      done();
      console.log(result.rows);
    });
  });
});

app.get("/", function (req, res) {
  res.render("site/index");
});

app.get("/about", function (req, res) {
  res.render("site/about");
});

app.get("/contact", function (req, res) {
  res.render("site/contact");
});

app.get("/articles", function (req, res) {
  res.render("articles/index");
});

app.listen(3000, function () {
  console.log(new Array(51).join("*"));
  console.log("\t LISTENING ON: \n\t\t localhost:3000");
  console.log(new Array(51).join("*")); 
});

// var express = require("express"),
//   bodyParser = require("body-parser"),
//   methodOverride = require("method-override"),
//   pg = require("pg"),
//   app = express();

// app.use(bodyParser.urlencoded({extended: true}));

// app.use(methodOverride("_method"));
// app.set("view engine", "ejs");

// var config = {
//   database: "articles_app",
//   port: 5432,
//   host: "localhost"
// };

// app.get("/articles", function (req, res) {
//    pg.connect(config, function(err, client, done){
//         if (err) {
//              //console.error("OOOPS!!! SOMETHING WENT WRONG!", err);
//             console.log(err)
//         }
//         var statement = "SELECT * FROM articles";
//         var params = [];
//         client.query(statement, params, function (err, result) {
//           res.render("articles/index", {articleList: result.rows});  
//           done(); 
//         });
//         //client.query("SELECT * FROM articles", function (err, result) {
//         //     console.log(result.rows);  
//         //     res.render("articles/index", {articleList: result.rows});         
//         // });
//     });
// });

// app.get("/articles/new", function (req, res) {
//   res.render("articles/new");
// });

// // app.get("/articles/:id", function (req, res) {

// //   pg.connect(config, function(err, client, done){
// //         if (err) {
// //              console.error("OOOPS!!! SOMETHING WENT WRONG!", err);
// //         }
// //         client.query("SELECT * FROM articles WHERE id=$1", [req.params.id], function (err, result) {
// //             done(); 
// //             console.log(result.rows);
// //           if (result.rows.length) {
// //             res.render("articles/show", {article: result.rows[0]});
// //           } else {
// //             // read about this http://expressjs.com/api.html#res.status
// //             res.status(404).send("Book Not Found");
// //           }      
// //         });

// //     });
// // });

// app.post("/articles", function (req, res) {
//   console.log(req.body);
//   // var newArticle = req.body.article;
//   pg.connect(config, function(err, client, done){
//     var statement = "INSERT INTO articles " + 
//                     "(title,author,content,fiction) " + 
//                     "VALUES ($1, $2, $3, $4) " + 
//                     "RETURNING *";
//     var params = [
//                   req.body.article.title,
//                   req.body.article.author,
//                   req.body.content,
//                   true
//                   ];
//     client.query(statement, params, function(err, result) {
//       res.redirect("/articles");
//     });
//       // if (err) {
//       //      console.error("OOOPS!!! SOMETHING WENT WRONG!", err);
//       // }
//       // client.query("INSERT INTO articles (title, author, content) VALUES ($1, $2, $3) RETURNING *", [newArticle.title, newArticle.author, newArticle.content], function (err, result) {
//       //     done(); 
//       //     console.log(result.rows);  
//       //     var article = result.rows[0];   
//       //     res.redirect("/articles/" + article.id);      
//       // });
//   })
// });


// app.delete("/articles/:id", function (req, res) {
//   var articleId = parseInt(req.params.id);
//   var articleIndex = null;
//   for (var i = 0, notFound = true; i < articles.length && notFound; i+=1) {
//     if (articles[i].id == articleId) {
//       notFound = false;
//       articleIndex = i;
//     }
//   }
//   if (notFound) {
//     res.send(404).send("Article Not Found");
//   } else {
//     articles.splice(articleIndex, 1);
//     res.redirect("/articles");
//   }
// })
// // Site Routes

// // root path
// app.get("/", function (req, res) {
//   res.render("sites/index");
// });


// // don't forget to listen
// app.listen(3000, function () {
//   console.log(new Array(51).join("*"));
//   console.log("\t LISTENING ON: \n\t\t localhost:3000");
//   console.log(new Array2(51).join("*")); 
// });

