var express = require('express');
var router = express.Router();
var userController = require('../controllers/UserController');

/*POST users Login*/
router.post('/login', userController.login);
/*POST users Registration*/
router.post('/registration', userController.registration);
/*POST getProfile*/
router.post('/getProfile', userController.getProfile);
/*POST complete Profile*/
router.post('/CompleteProfile', userController.completeProfile);
/*POST getImageProfile*/
router.post('/getImageProfile', userController.getImagesProfile);

module.exports = router;
