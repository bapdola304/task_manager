
const express = require("express");
const router = express.Router();
const user = require('../models/user.model');
const userC = require('../controllers/user.controller');
const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcrypt');

router.get('/login', userC.login);
router.get('/register', userC.register);

router.post('/postRegister',userC.postRegister);

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/user/login');
});




router.post('/postLogin',passport.authenticate('local', { 	successRedirect: '/',
                                   							failureRedirect: '/user/login' }));
passport.use(new LocalStrategy(
  async function(username, password, done) {
      const user1 = await user.find({email : username});
      const match = await bcrypt.compare(password, user1[0].password);
      if(user1.length > 0 && match){
        return done(null, user1[0].email);
      }else{
        return done(null,false);
      }
  }
));
passport.serializeUser((user, done) =>{
  done(null, user);
})

passport.deserializeUser(async function(name, done) {


      const user1 = await user.find({email : name});
      if(user1.length > 0){
        return done(null, user1[0].name);
      }else{
        return done(null,false);
      }

    
  });
module.exports = router;