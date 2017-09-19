import cors from 'cors'
import colors from 'colors'
import morgan from 'morgan'
import express from 'express'
import mongoose from 'mongoose'
import bluebird from 'bluebird'
import bodyParser from 'body-parser'

import config from './config'
import routes from './routes'
import seed from './config/seed'

// Connect to MongoDB
mongoose.Promise = bluebird
mongoose.connect(config.mongo.uri,{ db: { safe: true }})
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err)
  process.exit(-1)
})

// Create express app
var app = express()

// Configure middleware
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

// Assign routes
routes(app)

// Seed data
if (config.seed){
	seed().then(() => {
		console.log('Data seeded')
	}).catch((error) => {
		console.error(error)
	})
}

var server = require('http').createServer(app);

// Listen on port
let listener = server.listen(config.port,function(){
	let address = listener.address()
	let link = `http://localhost:${address.port}/`.underline.blue
	if (config.debug) console.log('Server running at',link)
})

export default server