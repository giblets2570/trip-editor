'use strict';

import passport from 'passport';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import compose from 'composable-middleware';

module.exports = function(config,User){

  var validateJwt = expressJwt({
    secret: config.secrets.session
  });

  /**
   * Attaches the user object to the request if authenticated
   * Otherwise returns 403
   */
  function isAuthenticated() {
    return compose()
      // Validate jwt
      .use(function(req, res, next) {
        // allow access_token to be passed through query parameter as well
        if (req.query && req.query.hasOwnProperty('access_token')) {
          req.headers.authorization = 'Bearer ' + req.query.access_token;
        }
        validateJwt(req, res, next);
      })
      // Attach user to request
      .use(function(req, res, next) {
        User.findById(req.user._id).exec()
          .then(user => {
            if (!user) {
              throw {message: "You aren't authenticated to view this"}
              // return res.status(401).json({message: "You aren't authenticated to view this"});
            }
            req.user = user;
            next();
          })
          .catch(err => next(err));
      });
  }

  function meetsRequirements(user, roleRequired){
    return (
      config.userRoles.indexOf(user.role) >=
      config.userRoles.indexOf(roleRequired)
    )
  }

  /**
   * Checks if the user role meets the minimum requirements of the route
   */
  function hasRole(roleRequired) {
    if (!roleRequired) {
      throw new Error('Required role needs to be set');
    }
    return compose()
      .use(isAuthenticated())
      .use(function(req, res, next) {
        if (meetsRequirements(req.user, roleRequired)) {
          next();
        } else {
          res.status(403).json({message: "You don't meet the requirements"});
        }
      });
  }

  /**
   * Returns a jwt token signed by the app secret
   */
  function signToken(id, role) {
    return jwt.sign({ _id: id, role: role }, config.secrets.session, {
      expiresIn: 60 * 60 * 5
    });
  }


  return {
    hasRole:hasRole,
    signToken:signToken,
    isAuthenticated:isAuthenticated
  }
}