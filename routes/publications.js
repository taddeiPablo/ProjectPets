var express = require('express');
var router = express.Router();
var PublicationController = require('../controllers/PublicationController');



router.post('/prueba', PublicationController.save);



module.exports = router;