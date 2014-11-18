/*Creacion del controller para el Usuario*/

var crypto = require('crypto');
var usr = require('../models/UserModel').Usr;


//funcion login
//Atravez de esta funcion hacemos la verificacion
//del usuario si existe o no en la DB
exports.login = function(req, res, next){
	try{
		var nomUsr = req.body.usrname;
		var passEncrip = encriptPassword(nomUsr, req.body.password);
		
		usr.findOne({usrName: nomUsr, 'password': passEncrip}, function(err, docs){
			if(err){
				console.log('-------- hubo error --------');
				console.log(err);
			}else if(docs){
				res.json(true);
			}else{
				res.json(false);
			}
		});
	}catch(err){
		console.log(err);
	}
}

//function registration
exports.registration = function(req, res, next){
	try{
		var nomUsr = req.body.usrname;
		var pass = req.body.password;
		var email = req.body.email;
		var profile = {};
		usr.findOne({usrName: nomUsr}, function(err, docs){
			if(!docs){
				var passEncriptado = encriptPassword(nomUsr, pass);
				var newUsr = new usr({usrName:nomUsr, password:passEncriptado, email:email, profile:profile});
				newUsr.save(function(err){
					res.json(true);
				});
			}else{
				res.json(false);
			}
		});
	}catch(err){
		console.log(err);
	}
}

exports.completeProfile = function(req, res, next){
	try{
		

	}catch(err){
		console.log(err);
	}
}




//atravez de esta funcion se encriptan los password
//de los usuarios 
function encriptPassword(user, password){
	var hmac = crypto.createHmac('sha1', user).update(password).digest('hex');
	return hmac;
}

