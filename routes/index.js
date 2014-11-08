var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/*GET login page*/
router.get('/login', function(req, res){
	res.render('login');
});

/*GET admin page*/
router.get('/admin', function(req,res){
	res.render('admin');
});

module.exports = router;
