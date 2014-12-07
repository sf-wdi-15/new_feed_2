/******************************************
 ******************************************
 **
 **  Angelo's Articles 2 lab
 **  weekend 3 project
 **  primary technologies: 
 **    node.js
 **    express.js
 **    postgres (pg)
 **    foundation front-end framework
 **
 ******************************************
******************************************/

var express        = require('express'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    pg             = require('pg'),
    config         = require('./config.js'),
    db             = config.database;
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
  
//index articles
app.get('/articles', function(req, res){
  
  pg.connect(config, function(err, client, done){
    if(err){
      console.error("OOPS! SOMEHTING WENT WRONG!", err);
    }
    client.query('SELECT * FROM articles', [], function(err, result){
      done();
      
      console.log(result.rows);
      res.render('articles/index', {articleList: result.rows});
    });
  });

});

//new article form
app.get('/articles/new', function(req, res) {
  res.render('articles/new');
});

//post article new
app.post('/articles', function(req, res){
  var newArticle = req.body.article;

  pg.connect(config, function(err, client, done){
    if(err) {
      console.error("There was an error connecting to database", err);
    }
    client.query('INSERT INTO articles (title, author, summary) VALUES ($1, $2, $3) RETURNING *', [newArticle.title, newArticle.author, newArticle.summary ], function(err, result){
      done();
      
      console.log(result.rows);
      var article = result.rows[0];
      res.redirect('/articles/' + article.article_id);
    });
  });
});

//show article by id
app.get('/articles/:id', function(req, res){

  pg.connect(config, function(err, client, done){
    if(err) {
      console.error("OOPS! SOMEHTING WENT WRONG!", err);
    }
    client.query('SELECT * FROM articles WHERE article_id=$1', [req.params.id], function(err, result) {
        done();
        
        console.log(result.rows);
      if (result.rows.length) {
        res.render('articles/show', {article: result.rows[0]});  
      } else {
        res.status(404).send("article not found");
      }
    });
  });

});

//delete article by id
app.delete("/articles/:id", function(req, res){
  //var articleId = parseInt(req.params.id);
  
  pg.connect(config, function(err, client, done){
    if(err) {
      console.error("OOPS! SOMEHTING WENT WRONG!", err);
    }
    client.query('DELETE FROM articles WHERE article_id=$1 RETURNING *', [req.params.id], function(err, result) {
        done();
        
        console.log(result.rows);
      if (result.rows.length) {
        console.log('deleted successfully');
        res.redirect('/'); 
      } else {
        res.status(404).send("article not found");
      }
    });
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
  res.render('../public/index');
});

//about page
app.get('/about', function(req, res){
  res.render('../public/about');
});

//contact page
app.get('/contact', function(req, res){
  res.render('../public/contact');
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

