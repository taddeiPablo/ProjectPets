/*MODEL USERS*/

var user = require('../models/Schemas').User;
var profile = require('../models/Schemas').Profile;
var GridFS = require('../models/Schemas').GFs;

module.exports = {
	Usr : user,
	prof : profile,
	GFS : GridFS
}

