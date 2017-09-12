import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken'; 
import LocalStrategy from 'passport-local';

module.exports = function(User,Auth) {

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, function(username, password, done) {
    User.findOne({email:username},(err,user) => {
      if(err)
        return done(null, false, { message: 'Error in request.' });
      if(!user)
        return done(null, false, { message: 'Incorrect username.' });
      return done(null, user);
    });
  }));

  var router = express.Router();

  router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      var error = err || info;
      if (error) {
        return res.status(401).json(error);
      }
      if (!user) {
        return res.status(404).json({message: 'Something went wrong, please try again.'});
      }

      var token = Auth.signToken(user._id, user.role);
      res.json({ token });
    })(req, res, next)
  });

  router.get('/loggedin', (req, res) => {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(req.isAuthenticated()){
      User.findOne(req.user._id,(err,user) => {
        if(err||!user){return res.send('0')}
        return res.status(200).json(req.user);
      })
    }else if(token){
      jwt.verify(token, process.env.SESSION_SECRET, (err, decoded) => {
        if (err) {return res.send('0');} 
        else {return res.send('Logged in');}
      });
    }else{
      return res.send('0');
    }
  });

  // route to log out
  router.get('/logout', (req, res) => {
    if(req.isAuthenticated()){
      User.findOne({_id: req.user._id}, (err, user)=>{
        if(!user) throw("No user");
        user.save()
        .then(_=>{
          req.logout();
          return res.redirect('/login');
        })
        .catch(err=>{
          req.logout();
          return res.redirect('/login');
        });
      });
    }
  });

  return router;
}