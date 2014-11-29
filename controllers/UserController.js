/*Creacion del controller para el Usuario*/

var crypto = require('crypto');
var usr = require('../models/UserModel').Usr;
var imagesP = require('../models/UserModel').ImgP;
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
	try{
		var imgBuffer = req.body.imgUrl;
		var profile = {
			name: req.body.name, 
			lastName: req.body.lastName, 
			address: req.body.address, 
			location: req.body.location, 
			phone: req.body.phone, 
			mobile: req.body.mobile
		};
		idusrSess = req.body.idUsr;

		usr.findByIdAndUpdate(idusrSess, {profile:profile}, { multi: true }, function(err, afect){
			if(err){
				console.log(err);
			}else{
				console.log('update success' + afect);
				var imgProfile = new imagesP({usrN: req.body.userName, img:imgBuffer});
				imgProfile.save(function(err){
					if(err){
						console.log('error al cargar la imagen' + err);
					}else{
						console.log('bien cargada la imagen');
					}
				});
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
					var Profile = {
						name: docs.profile.name, 
						lastName: docs.profile.lastName, 
						address: docs.profile.address, 
						location: docs.profile.location, 
						phone: docs.profile.phone, 
						mobile: docs.profile.mobile
					};
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

//
exports.getImagesProfile = function(req, res, next){
	res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  	res.header("Pragma", "no-cache");
  	res.header("Expires", 0);
  	try{
  		var nomusr = req.body.usrName;
  		console.log(nomusr);
		imagesP.findOne({usrN: nomusr}, function(err, docs){
			if(err){
				console.log('-----	error	-----');
				console.log(err);
			}else{
				if(docs != undefined){
					//var imgOriginal = //getBinary(docs.img);
					var image = {
						img : docs.img
					}
					res.json(image);
				}else{
					res.json(false);
				}
			}
		});
  	}catch(err){

  	}
}


//atravez de esta funcion se encriptan los password
//de los usuarios 
function encriptPassword(user, password){
	var hmac = crypto.createHmac('sha1', user).update(password).digest('hex');
	return hmac;
}