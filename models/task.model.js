const mongoose = require('mongoose');

let task = new mongoose.Schema({
	name : String,
	state : String,
	date : String
});

module.exports = mongoose.model('task', task, 'Tasks')