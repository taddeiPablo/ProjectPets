var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/*GET login page*/
router.get('/login', function(req, res){
	res.render('Templates\\login');
});

/*GET admin page*/
router.get('/admin', function(req, res){
	res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  	res.header("Pragma", "no-cache");
  	res.header("Expires", 0);
	res.render('Templates\\admin');
});

/*GET profile template profile*/
router.get('/profile', function(req, res){
	res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  	res.header("Pragma", "no-cache");
  	res.header("Expires", 0);
	res.render('\\Templates\\Profile');
});

router.get('/NewPublication', function(req, res){
	res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  	res.header("Pragma", "no-cache");
  	res.header("Expires", 0);
	res.render('\\Templates\\publicaciones');
});

module.exports = router;
