/*CONEXION AL SERVIDOR DE BASE DE DATOS*/

var mongoose = require('mongoose');
var db = mongoose.createConnection( 'mongodb://localhost:27017/Pets' );


module.exports = {
	DB : db
}