/*AQUI CREAMOS TODOS LOS ESQUEMA DE LOS DOCUMENTOS*/

var mongoose = require('mongoose');
var db = require('../models/server').DB;
var schema = mongoose.Schema;

//Esquema del documento para usuario
var userSchema = new schema({
	usrName : String,
	password : String,
	email : String,
	profile : {}
});

//Esquema del documento para las organizaciones
var organizationSchema = new schema({
	socialreason : String,
	address : String,
	location : String,
	phone : String,
	email : String,
	descripcion : String
});

//Esquema del documento para las publicaciones
var publicationSchema = new schema({
	images: [Number],
	asunto : String,
	petName : String,
	age : Number,
	sex : String,
	currentowner : String,
	veterinaryrecord : {},
	description : String,
	adoption : Boolean
});

//Esquema del documento para las alertas
var alertSchema = new schema({
	image : Number,
	location : String,
	usrName : String,
	description : String
});

//Esquema del documento para los historiales de adopciones
var hadoptionSchema = new schema({
	images : [Number],
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


//Esquema del documento para las imagenes
var imgUsrOrg = new schema({
	usrN: String,
	img: String
});



/*COMPILACION DE LOS MODELOS-
**aqui se crean los modelos apartir de los esquemas creados*/
var UserModel = db.model('User', userSchema);
var OrganizationModel = db.model('Organization', organizationSchema);
var PublicationModel = db.model('Publication', publicationSchema);
var AlertModel = db.model('Alert', alertSchema);
var HadoptionModel = db.model('Hadoption', hadoptionSchema);
var MessageModel = db.model('Message', messageSchema);
var imagenesProfileModel = db.model('Profile', imgUsrOrg);

//aqui se exportan los modelos
module.exports = {
	User : UserModel,
	Org : OrganizationModel,
	Publication : PublicationModel,
	alert : AlertModel,
	historyAdoption : HadoptionModel,
	message : MessageModel,
	imgProfile : imagenesProfileModel
}