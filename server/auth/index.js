import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken'; 
import LocalStrategy from 'passport-local';

function AuthRoutes(config, User, Auth) {

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (username, password, done) => {
    User.findOne({email:username}, (err, user) => {
      if(err)
        return done(null, false, { message: 'Error in request' });
      if(!user)
        return done(null, false, { message: 'Incorrect username' });
      if(!user.authenticate(password))
        return done(null, false, { message: 'Incorrect password' });
      return done(null, user);
    });
  }));

  var router = express.Router();

  router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      var error = err || info;
      if (error) {
        return res.status(401).json(error);
      }
      if (!user) {
        return res.status(404).json({message: 'Something went wrong, please try again'});
      }
      var token = Auth.signToken(user._id, user.role);
      res.json({ token, user: user.profile });
    })(req, res, next);
  });

  router.get('/loggedin', Auth.isAuthenticated(), (req, res) => {
    return res.send(req.user.profile);
  });

  return router;
}

export default AuthRoutes;