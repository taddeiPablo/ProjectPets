/*Creacion del controller para el user*/

var usr = require('../models/UserModel').usrModel;

//funcion login
exports.login = function(req, res, next){
	try{
		var nomUsr = req.body.nomUsr;
		var pass = req.body.pass;
		usr.findOne({usrName:nomUsr}, function(err, docs){
			if(err){
				console.log('hubo error' + err);
			}
			res.send('no existe el usuario');
		});
	}catch(err){
		console.log(err);
	}
}

//function registration
exports.registration = function(req, res, next){
	try{


	}catch(err){

	}
}

