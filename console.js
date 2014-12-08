var repl = require('repl');
var db = require('./models');

repl.start("Hello class >").context.db = db;