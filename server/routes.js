import express from 'express';
import config from './config';
import path from 'path';

import AuthService from './auth/auth.service';
import User from './api/user/user.model';
const Auth = AuthService(config,User);

import AuthRoutes from './auth';

function loadClass(name,type){
  var Class;
  try {
    Class = require(`./api/${name}/${name}.${type}`);
  } catch(error) {
    if (config.debug) console.log(`Didn't find ${name} ${type}`);
    if (error.name === 'SyntaxError') throw(error);
    else if (error.name === 'ReferenceError') throw(error);
    else Class = require(`./utilities/${type}`);
  }
  return Class
}

function createRoute(name){
  var router = express.Router();
  var Model = loadClass(name,'model');
  var Service = loadClass(name,'service');
  var Endpoint = loadClass(name,'endpoint');
  var service = new Service(Model);
  var endpoint = new Endpoint(router,service,Auth);
  return router;
}

export default function(app) {
  app.use('/auth',  AuthRoutes(User,Auth));
  app.use('/users', createRoute('user'));
  // Serve static assets
  // app.use(express.static(path.resolve(__dirname, '..', 'build')));
  // Always return the main index.html, so react-router render the route in the client
  // app.get('*', (req, res) => {
  //   console.log("Here");
  //   res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
  // });
}