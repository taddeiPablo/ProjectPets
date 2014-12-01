/*Creacion del controller para el Usuario*/

var crypto = require('crypto');
var usr = require('../models/UserModel').Usr;
var profile = require('../models/UserModel').prof;
var gridFS = require('../models/UserModel').GFS;
var idusrSess;
var urlImages = '\\public\\temp\\';
var path = require('path');

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

/*funcion para completar el profile*/
exports.completeProfile = function(req, res, next){
	res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  	res.header("Pragma", "no-cache");
  	res.header("Expires", 0);
	try{
		idusrSess = req.body.idUsr;
		var urlimg = req.body.imgUrl;
		
		//console.log(gridFS);

		/*Profile = new profile({
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
				
				res.json(true);
			}
		});*/
		upload_img(urlimg);
	}catch(err){
		console.log(err);
	}
}

/*function para obtener el profile*/
exports.getProfile = function(req, res, next){
	res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  	res.header("Pragma", "no-cache");
  	res.header("Expires", 0);
	try{
		idusrSess = req.body.user;
		console.log(idusrSess);
		profile.findOne({user:idusrSess}, function(err, docs){
			if(err){
				console.log('error al recuperar datos');
				console.log(err);
			}else{
				if(docs != undefined){
					var Profile = {
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

function upload_img(urlImg){
	try{
		//console.log(urlImg);
		var fs = require('fs');
		var source = fs.createReadStream(path.join(__dirname, '/../../public/target.txt'));    
		var target = gridFS.createWriteStream({        
			filename: 'file.txt'    
		});    
		source.pipe(target);
	}catch(err){
		console.log('error motivo '+err);
	}
}