/*Creacion del controller para el Usuario*/

var crypto = require('crypto');
var usr = require('../models/UserModel').Usr;
var profile = require('../models/UserModel').prof;
var imgP = require('../models/UserModel').imgP;
var idusrSess;


/*funcion login
*Atravez de esta funcion hacemos la verificacion
*del usuario si existe o no en la DB*/
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

/*function registration*/
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

//atravez de esta funcion se encriptan los password
//de los usuarios 
function encriptPassword(user, password){
	var hmac = crypto.createHmac('sha1', user).update(password).digest('hex');
	return hmac;
}

/**
 *=====================================================
 *====== Alta y actualizacion de perfil y imagen ======
**/

/*funcion para completar el profile*/
exports.completeProfile = function(req, res, next){
	res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  	res.header("Pragma", "no-cache");
  	res.header("Expires", 0);
	try{
		idusrSess = req.body.idUsr;
		var urlimg = req.body.imgUrl;
		var flag = req.body.p;
		console.log(flag);
		switch(flag)
		{
			case '0':
  				console.log('alta');
  				Profile = new profile({
					user:idusrSess, 
					name:req.body.name, 
					lastName:req.body.lastName, 
					address: req.body.address,
					location:req.body.location,
					phone:req.body.phone,
					mobile:req.body.mobile     
				});
				Profile.save(function(err){
					if(err){
						console.log(err + 'error');
						res.json(false);
					}else{
						console.log('profile success');
						upload_img(urlimg, idusrSess);
						res.json('save');
					}
				});
  			break;
			case '1':
				console.log('actualizar');
				var ProfileUpdate = {
					user:idusrSess, 
					name:req.body.name, 
					lastName:req.body.lastName, 
					address: req.body.address,
					location:req.body.location,
					phone:req.body.phone,
					mobile:req.body.mobile
				};
				profile.findOne({user: idusrSess}, function(err, docs){
					if(err){
						console.log('error' + err);
					}else{
						console.log('success update');
						docs.name = ProfileUpdate.name;
						docs.lastName = ProfileUpdate.lastName;
						docs.address = ProfileUpdate.address;
						docs.location = ProfileUpdate.location;
						docs.phone = ProfileUpdate.phone;
						docs.mobile = ProfileUpdate.mobile;
						docs.save();
						update_img(urlimg, docs._id);
						res.json('update');
					}
				});
  			break;
			default:
				console.log('ninguna');
		}
	}catch(err){
		console.log(err);
	}
}

/*En esta funcion guardamos la imagen del perfil*/
function upload_img(urlImg, idusr){
	try{
		console.log('alta img');
		profile.findOne({user: idusr}, function(err, docs){
			if(err){
				console.log('error' + err);
			}else{
				var imagenProfile = new imgP({profile:docs._id, data:urlImg});
				imagenProfile.save(function(err){
					if(err){
						console.log('error en carga de imagen' + err);
					}else{
						console.log('imagen bien cargada');
					}
				});
			}
		});
	}catch(err){
		console.log('error motivo '+err);
	}
}

/*En esta funcion acemos la actualizacion de la imagen de perfil*/
function update_img(urlImg, idProf){
	try{
		console.log('actualizar img');
		var imagenProfileUp = {profile:idProf, data:urlImg};
		imgP.findOne({profile: idProf}, function(err, docs){
			if(err){
				console.log('error' + err);
			}else{
				if(docs.data != imagenProfileUp.data){
					docs.data = imagenProfileUp.data;
					docs.save();
				}
			}
		});
	}catch(err){
		console.log('error' + err);
	}
}

/**
 *======================================================
 *========= Obtencion del Perfil y la Imagen ===========
**/


/*function para obtener el profile*/
exports.getProfile = function(req, res, next){
	res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  	res.header("Pragma", "no-cache");
  	res.header("Expires", 0);
  	console.log('ingreso aqui');
	try{
		idusrSess = req.body.user;
		//console.log(idusrSess);
		profile.findOne({user:idusrSess}, function(err, docs){
			if(err){
				console.log('error al recuperar datos');
				console.log(err);
			}else{
				if(docs != undefined){
					var Profile = {
						idP : docs._id,
						name: docs.name, 
						lastName: docs.lastName, 
						address: docs.address, 
						location: docs.location, 
						phone: docs.phone, 
						mobile: docs.mobile
					};
					res.json(Profile);
				}else{
					res.json(false);
				}
			}
		});
	}catch(err){
		console.log(err);
	}
}

/**/
exports.getImagesProfile = function(req, res, next){
	res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  	res.header("Pragma", "no-cache");
  	res.header("Expires", 0);
  	try{
  		//console.log('imagenes aqui entro');
  		var profileId = req.body.idprof;
  		//console.log(profileId);
		imgP.findOne({profile: profileId}, function(err, docs){
			if(err){
				console.log('-----	error	-----');
				console.log(err);
			}else{
				if(docs != undefined){
					var image = {
						img : docs.data
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

