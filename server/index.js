// Set default node environment to development
const NODE_ENV = process.env.NODE_ENV || 'development'

require('babel-polyfill')
require('babel-register')


// Export the application
process.env.NODE_ENV = NODE_ENV
exports = module.exports = require('./app')