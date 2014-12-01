var express = require('express');
var router = express.Router();
var PublicationController = require('../controllers/PublicationController');

/*Consultas de publicaciones*/
router.post('/publications', PublicationController.Publications);

/*Alta de nueva publicacion*/
router.post('/NewPublication', PublicationController.NewPublication);





module.exports = router;