const mongoose = require('mongoose');

let task = new mongoose.Schema({
	name : String,
	state : String
});

module.exports = mongoose.model('task', task, 'Tasks')