/*AQUI CREAMOS TODOS LOS ESQUEMA DE LOS DOCUMENTOS*/

var mongoose = require('mongoose');
var db = require('../models/server').DB;
var schema = mongoose.Schema;

//Esquema del documento para usuario
var userSchema = new schema({
	usrName : String,
	password : String,
	email : String,
	Profile : {}
});

//
var organizationSchema = new schema({
	socialreason : String,
	address : String,
	location : String,
	phone : String,
	email : String,
	descripcion : String
});

//
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

//
var alertSchema = new schema({
	image : Number,
	location : String,
	usrName : String,
	description : String
});

//
var hadoptionSchema = new schema({
	images : [Number],
	usrName : String,
	description : String
});

//
var messageSchema = new schema({
	usrName1 : String,
	message1 : String,
	usrName2 : String,
	message2 : String
});


/**/
var UserModel = db.model('UserModel', userSchema);
var OrganizationModel = db.model('OrganizationModel', organizationSchema);
var PublicationModel = db.model('PublicationModel', publicationSchema);
var AlertModel = db.model('AlertModel', alertSchema);
var HadoptionModel = db.model('HadoptionModel', hadoptionSchema);
var MessageModel = db.model('MessageModel', messageSchema);

//
module.exports = {
	User : UserModel,
	Org : OrganizationModel,
	Publication : PublicationModel,
	alert : AlertModel,
	historyAdoption : HadoptionModel,
	message : MessageModel
}