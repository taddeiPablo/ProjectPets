/*Creacion del controller para el Usuario*/

var usr = require('../models/UserModel').Usr;

//funcion login
//Atravez de esta funcion hacemos la verificacion
//del usuario si existe o no en la DB
exports.login = function(req, res, next){
	try{
		console.log('ingreso aqui');
		var nomUsr = req.body.UsrName;
		var pass = req.body.password;
		usr.findOne({usrName:nomUsr}, function(err, docs){
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
		console.log(req.body.usrname);
		/*var nomUsr = req.body.usrname;
		var pass = req.body.password;
		var email = req.body.email;
		var profile = {};*/
		//console.log(nomUsr);
		//var newUsr = new usr({usrName:nomUsr, password:pass, email:email, profile:profile});
		//console.log(newUsr);
		/*newUsr.save(function(err){
			if(err){
				res.json(false);
			}else{
				res.json(true);
			}
		});*/
	}catch(err){
		console.log(err);
	}
}

