
const task = require('../models/task.model');


module.exports.addTask = async (req, res) =>{
	console.log(req.body);
	let task1 = new task(req.body);
	task1.save();
	res.redirect('/');
}
module.exports.delete = async (req, res) =>{
		let id = req.params.id;
	console.log(id);
	 await task.deleteOne({_id:id });
	 res.redirect('/');
}

module.exports.editTask = async (req, res) =>{
		let id = req.params.id;
	console.log(id);
	  await task.updateOne({_id:id },{
	  	name : req.body.name,
	  	state : req.body.state
	  });
	  res.redirect('/');
}
module.exports.search = async (req, res) =>{
	let data = req.body.data;
	console.log(data);

	let tasks = await task.find();
	console.log(tasks);
	let tasksSearch = tasks.filter(task =>{
		return task.name.toLowerCase().indexOf(data.toLowerCase()) != -1;
	})
	res.render('resultSearch',{ tasks : tasksSearch });
}

module.exports.state = async (req, res) =>{
	let data = req.body.data;
	console.log(data);

	let tasks = await task.find();
	if(data === '-1'){
		 res.render('resultState',{ tasks : tasks });
		 return;
	}
	let tasksState = tasks.filter(task =>{
		return task.state === data;
	});
	res.render('resultState',{ tasks : tasksState, state : data });
}	