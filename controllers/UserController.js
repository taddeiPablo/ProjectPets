/*Creacion del controller para el Usuario*/

var crypto = require('crypto');
var usr = require('../models/UserModel').Usr;
var idusrSess;

//funcion login
//Atravez de esta funcion hacemos la verificacion
//del usuario si existe o no en la DB
exports.login = function(req, res, next){
	res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  	res.header("Pragma", "no-cache");
  	res.header("Expires", 0);

	try{
		var nomUsr = req.body.usrname;
		var passEncrip = encriptPassword(nomUsr, req.body.password);
		
		usr.findOne({usrName: nomUsr, 'password': passEncrip}, function(err, docs){
			if(err){
				console.log('-------- hubo error --------');
				console.log(err);
			}else if(docs){
				res.json(docs._id);
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
	res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  	res.header("Pragma", "no-cache");
  	res.header("Expires", 0);
	
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

//funcion para completar el profile
exports.completeProfile = function(req, res, next){
	res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  	res.header("Pragma", "no-cache");
  	res.header("Expires", 0);
	console.log('ingreso');
	try{
 
		var profile = {
			name: req.body.name, 
			lastName: req.body.lastName, 
			address: req.body.address, 
			location: req.body.location, 
			phone: req.body.phone, 
			mobile: req.body.mobile
			//image: req.body.image
		};
		idusrSess = req.body.idUsr;

		usr.findByIdAndUpdate(idusrSess, {profile:profile}, { multi: true }, function(err, afect){
			if(err){
				console.log(err);
			}else{
				console.log('update success' + afect);
				res.json(true);
			}
		});
	}catch(err){
		console.log(err);
	}
}

//function para obtener el profile
exports.getProfile = function(req, res, next){
	res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  	res.header("Pragma", "no-cache");
  	res.header("Expires", 0);
	console.log('ingreso en profile');
	try{
		var nomusr = req.body.usrName;
		usr.findOne({usrName: nomusr}, function(err, docs){
			if(err){
				console.log('-----	error	-----');
				console.log(err);
			}else if(docs){
				if(docs.profile == undefined){
					res.json(false);
				}else{
					var Profile = docs.profile;
					res.json(Profile);
				}
			}else{
				console.log('erro');
				res.json(false);
			}
		});
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

//
function upload(filePath){
	try{
		var fs = require('fs');
		var path = filePath;
		var newPath = 'images';

		var is = fs.createReadStream(path);
		var os = fs.createWriteStream(newPath);

		is.pipe(os);

		is.on('end', function(){
			fs.unlinkSync(path);
		});
	}catch(err){

	}
}