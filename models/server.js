/*CONEXION AL SERVIDOR DE BASE DE DATOS*/

var mongoose = require('mongoose');
var grid = require('gridfs-stream');
var db = mongoose.createConnection( 'mongodb://localhost:27017/Pets' );
var gfs = grid(db.db, mongoose.mongo);

module.exports = {
	DB : db,
	GFs : gfs
}