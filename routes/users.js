var express = require('express');
var router = express.Router();
var userController = require('../controllers/UserController');

/*POST users Login*/
router.post('/login', userController.login);

/*POST users Registrar*/
router.post('/registrar', userController.registration);

module.exports = router;
