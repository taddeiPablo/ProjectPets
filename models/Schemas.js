/*AQUI CREAMOS TODOS LOS ESQUEMA DE LOS DOCUMENTOS*/

var mongoose = require('mongoose');
var db = require('../models/server').DB;
var schema = mongoose.Schema;
var ObjectId = schema.ObjectId;

//Esquema del documento para usuario
var userSchema = new schema({
	usrName : String,
	password : String,
	email : String,
});

//Esquema del documento para el profile
var profileSchema = new schema({
	user:{
		type: ObjectId,
		ref: 'users'
	},
	name: String,
	lastName : String,
	address : String,
	location : String,
	phone : String,
	mobile : String
});

//Esquema del documento para la imagen del perfil
var imagesProfileSchema = new schema({
	profile : {
		type: ObjectId,
		ref: 'profiles'
	},
	data: String
});

/*
 *================================================
 *			ESQUEMA DE PUBLICACIONES 
 *================================================
*/

//Esquema del documento para las publicaciones
var publicationSchema = new schema({
	user:{
		type: ObjectId,
		ref: 'users'
	},
	asunto: String,
	nombreMascota : String,
	edad : Number,
	DuenioActual : String,
	Descripcion: String,
	Adoptante : String
});

//Esquema del documento para las imagenes de las publicaciones
var imagesPublicationSchema = new schema({
	publication:{
		type: ObjectId,
		ref: 'publications'
	},
	data: String
});

//Esquema del documento para las alertas
var alertSchema = new schema({
	user: {
		type: ObjectId,
		ref: 'users'
	},
	location : String,
	usrName : String,
	description : String
});

//Esquema del documento para los historiales de adopciones
var hadoptionSchema = new schema({
	user:{
		type: ObjectId,
		ref: 'users'
	},
	usrName : String,
	description : String
});

//Esquema del documento para los mensajes resividos y enviados
var messageSchema = new schema({
	usrName1 : String,
	message1 : String,
	usrName2 : String,
	message2 : String
});

/*COMPILACION DE LOS MODELOS-
**aqui se crean los modelos apartir de los esquemas creados*/
var UserModel = db.model('User', userSchema);
var ProfileModel = db.model('Profile', profileSchema);
var ImagesprofileModel = db.model('ImgProfile',imagesProfileSchema);
var PublicationModel = db.model('Publication', publicationSchema);
var ImagesPublicationModel = db.model('ImgPublication', imagesPublicationSchema);
var AlertModel = db.model('Alert', alertSchema);
var HadoptionModel = db.model('Hadoption', hadoptionSchema);
var MessageModel = db.model('Message', messageSchema);

//aqui se exportan los modelos
module.exports = {
	User : UserModel,
	Profile: ProfileModel,
	imageProfile: ImagesprofileModel,
	publication : PublicationModel,
	imgPublication : ImagesPublicationModel,
	alert : AlertModel,
	historyAdoption : HadoptionModel,
	message : MessageModel,
}