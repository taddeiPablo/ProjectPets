/*Creacion del controller para las publicaciones*/

var publicationN = require('../models/PublicationModel').Publication;
var imagesP = require('../models/PublicationModel').imgpublic;
	
exports.Publications = function(req, res, next){
	res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  	res.header("Pragma", "no-cache");
  	res.header("Expires", 0);
	try{
		/*Public.find({}, function(err, docs){
			if(err){
				console.log('error' + err);
			}else{
				res.json(docs);
			}
		});*/
		res.json('funciona');
	}catch(err){
		console.log('error' + err);
	}
}

exports.load = function(req, res, next){
	try{

	}catch(err){

	}
}

exports.save = function(req, res, next){
	/*res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  	res.header("Pragma", "no-cache");
  	res.header("Expires", 0);*/
	try{
		var publication = new publicationN({
			user: req.body.idUsr,
			asunto: req.body.asunto,
			nombreMascota: req.body.petName,
			edad : req.body.edad,
			DuenioActual: req.body.dueno,
			Descripcion: req.body.descripcion
		});
		console.log(publication);
		//console.log(req.body.imgP);
		/*console.log(publication.idUsr);
		console.log(publication.asunto);
		console.log(publication.nombreMascota);
		console.log(publication.edad);
		console.log(publication.DuenioActual);
		console.log(publication.Descripcion);
		console.log('============================');
		/*console.log(req.body.imgP);*/
		res.json('si');
		/*publication.save(function(err){
			if(err){
				console.log('error' + err);
			}else{
				res.json(true);
			}
		});*/
	}catch(err){

	}
}




function upload_img(){
	
}