const user = require('../models/user.model');
const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcrypt');
const saltRounds = 10;
const mongoose = require('mongoose');
module.exports.login = (req, res) =>{

  res.render("login");
}

module.exports.register = (req, res) =>{

  res.render("register",{ errors : [], value : '' });
}

module.exports.postRegister = async (req, res) =>{
	let errors = [];

	if(!req.body.name){
		errors.push('Name is required');
	}
	if(!req.body.email){
		errors.push('Email is required');
	}
	if(!req.body.password){
		errors.push('password is required');
	}
	if(req.body.password !== req.body.passwordA){
		errors.push('password incorrect');
	}

	if(errors.length){
		res.render('register',{ errors : errors, value : req.body });
		return;
	}
	var hash = bcrypt.hashSync(req.body.password, saltRounds);
	console.log(hash);
	let user1 = new user({
		name : req.body.name,
		email : req.body.email,
		password : hash
	})
	user1.save();
	req.flash('success_msg','You are now registered and can log in');
	res.redirect('/user/login');

}


