const task = require('../models/task.model');
module.exports.index = async (req, res) =>{
	let taskList = await task.find();
	console.log(taskList);
  res.render("index", {tasktList : taskList});
}
