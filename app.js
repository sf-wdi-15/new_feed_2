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
  db.Article
    .findAll()
    .then (function (article) {
      res.render ('articles/index', {articleList: article});
    })
    .catch (function (err) {
      console.log(err);
    });
});

// get new article form
app.get('/articles/new', function (req, res) {
  res.render('articles/new');
});

// post new article
app.post('/articles', function (req, res) {
  db.Article
    .create ({
              title:   req.body.article.title,
              author:  req.body.article.author,
              summary: req.body.article.summary,
              img_url: req.body.article.img_url
    })
    .then (function (article) {
      res.redirect('/articles');
  }).catch (function(err) {
    console.log(err);
  });
});

// get article by id
app.get('/articles/:id', function (req, res) {
  db.Article
    .find( parseInt( req.params.id ) )
    .then( function( result ) {
      res.render('articles/show', { article: result });
    })
    .catch( function(err) {
      console.log(err);
    });
});


//delete article by id
app.delete('/articles/:id', function (req, res) {
  db.Article
    .find( parseInt( req.params.id ) ) 
    .then( function (article) {
      article.destroy()
      .then( function () {
        console.log('deleted successfully');
        res.redirect('/articles');
      })
    })
    .catch( function (err) {
      console.log(err);
    });
});


/*****************
 *****************
 **
 ** SITE ROUTES
 **
 *****************
*****************/

//homepage
app.get('/', function(req, res){
  res.render('site/index');
});

//about page
app.get('/about', function(req, res){
  res.render('site/about');
});

//contact page
app.get('/contact', function(req, res){
  res.render('site/contact');
});


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

