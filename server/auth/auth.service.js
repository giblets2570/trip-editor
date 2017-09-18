'use strict'

import passport from 'passport'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import compose from 'composable-middleware'

function Auth(config, User) {

  const validateJwt = expressJwt({
    secret: config.secrets.session
  })

  class AuthService {
    /**
     * Attaches the user object to the request if authenticated
     * Otherwise returns 403
     */
    static isAuthenticated() {
      return compose()
        // Validate jwt
        .use((req, res, next) => {
          // allow access_token to be passed through query parameter as well
          if (req.query && req.query.hasOwnProperty('access_token')) {
            req.headers.authorization = 'Bearer ' + req.query.access_token
          }
          validateJwt(req, res, next)
        })
        // Attach user to request
        .use((req, res, next) => {
          User.findById(req.user._id).exec()
            .then(user => {
              if (!user) {
                throw {message: "You aren't authenticated to view this"}
              }
              req.user = user
              next()
            })
            .catch(err => next(err))
        })
    }

    static meetsRequirements(user, roleRequired){
      return (
        config.userRoles.indexOf(user.role) >=
        config.userRoles.indexOf(roleRequired)
      )
    }

    /**
     * Checks if the user role meets the minimum requirements of the route
     */
    static hasRole(roleRequired) {
      if (!roleRequired) {
        throw new Error('Required role needs to be set')
      }
      return compose()
        .use(AuthService.isAuthenticated())
        .use(function(req, res, next) {
          if (AuthService.meetsRequirements(req.user, roleRequired)) {
            next()
          } else {
            res.status(403).json({message: "You don't meet the requirements"})
          }
        })
    }

    /**
     * Returns a jwt token signed by the app secret
     */
    static signToken(id, role) {
      return jwt.sign({ _id: id, role: role }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      })
    }

  }
  return AuthService
}

export default Auth