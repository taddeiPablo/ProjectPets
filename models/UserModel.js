/*MODEL USERS*/

var user = require('../models/Schemas').User;
var profile = require('../models/Schemas').Profile;
var imgProfile = require('../models/Schemas').imageProfile;

module.exports = {
	Usr : user,
	prof : profile,
	imgP : imgProfile
}

