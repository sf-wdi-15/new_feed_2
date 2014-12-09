/******************************************
 ******************************************
 **
 **  Angelo's Articles 3 lab
 **  integrating sequelize 
 **  primary technologies: 
 **    node.js
 **    express.js
 **    postgres (pg)
 **    sequelize
 **    foundation front-end framework
 **
 ******************************************
******************************************/

var express        = require('express'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    db             = require('./models'),
    app            = express();


/*****************
 *****************
 **
 ** APP SETTINGS
 **
 *****************
*****************/
  
  app.use(express.static(__dirname + '/public'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(methodOverride('_method'));
  app.set('view engine', 'ejs');


/*****************
 *****************
 **
 ** ARTICLE ROUTES
 **
 *****************
*****************/
  
// get articles index
app.get('/articles', function (req, res) {
  console.log(req.body);
  db.Article.findAll().then(function (article) {
      res.render('articles/index', {articleList: article});
    });
});

// get new article form
app.get('/articles/new', function (req, res) {
  res.render('articles/new');
});

// // post new article 
// app.post('/articles', function(req, res){
//   console.log(req.body);
//   db.article
//     .create({
//               title:   req.body.article.title,
//               author:  req.body.article.author,
//               content: req.body.article.summary
//     })
//     .then(function(article){
//       res.redirect('/articles');
//     });
// });

// //show article by id
// app.get('/articles/:id', function(req, res){
//   db.article
//     .find(id)
//     .then(function(article){
//       res.render('articles/:id');
//     });
// });

// //delete article by id
// app.delete("/articles/:id", function(req, res){
//   //var articleId = parseInt(req.params.id);
  
//   pg.connect(config, function(err, client, done){
//     if(err) {
//       console.error("OOPS! SOMEHTING WENT WRONG!", err);
//     }
//     client.query('DELETE FROM articles WHERE article_id=$1 RETURNING *', [req.params.id], function(err, result) {
//         done();
        
//         console.log(result.rows);
//       if (result.rows.length) {
//         console.log('deleted successfully');
//         res.redirect('/'); 
//       } else {
//         res.status(404).send("article not found");
//       }
//     });
//   });

// });


// /*****************
//  *****************
//  **
//  ** SITE ROUTES
//  **
//  *****************
// *****************/

// //homepage
// app.get('/', function(req, res){
//   res.render('site/index');
// });

// //about page
// app.get('/about', function(req, res){
//   res.render('site/about');
// });

// //contact page
// app.get('/contact', function(req, res){
//   res.render('site/contact');
// });


/*****************
 *****************
 **
 ** START SERVER
 **
 *****************
*****************/

app.listen(3000, function(){
  console.log('listening on port 3000');
});

