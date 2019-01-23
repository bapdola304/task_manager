
const express = require("express");
const router = express.Router();

const indexC = require('../controllers/index.controller');

router.get('/', a, indexC.index);

function a(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}else{
		req.flash('error_msg','You are now registered and can log in');
		res.redirect('/user/login');
	}
}


module.exports = router;