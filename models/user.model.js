const mongoose = require('mongoose');

let user = new mongoose.Schema({
	name : String,
	email : String,
	password : String
});

module.exports = mongoose.model('user', user, 'User')