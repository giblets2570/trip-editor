var colors = require('colors')
var path = require('path')
var glob = require('glob')
var Mocha = require('mocha')
require('env2')('.env');
var mongoose = require('mongoose')
var mockgoose = require('mockgoose')

// coMocha(Mocha)

// Global expectations
var chai = require('chai')
global.expect = chai.expect
global.assert = chai.assert
chai.use(require('chai-json-schema'))
global.addSchema = chai.tv4.addSchema
global.getSchema = chai.tv4.getSchema
chai.should()

// Load Sinon
global.sinon = require('sinon')

// Initialize Chai plugins
chai.use(require('sinon-chai'))
chai.use(require('chai-as-promised'))
chai.use(require('chai-things'))

// Allow ES6 syntax
require('babel-polyfill')
require('babel-register')

// Set test environment
process.env.NODE_ENV = 'test'

let runUnitTests = () => new Promise(
	(resolve,reject) => {
		// Instantiate a Mocha instance.
		var unitMocha = new Mocha({})

		// Load all json schemas
		let loadedSchemas = new Promise((resolve,reject) => {
			glob("./**/*.schema{,s}.js", (error, files) => {
				if (error) return reject(error)
				files.forEach((file) => require(file.replace('server','')))
				resolve()
			})
		})

		// Find files and run all tests
		let loadedTests = new Promise((resolve,reject) => {
			glob("./server/**/*.spec.js", (error, files) => {
				if (error) return reject(error)
				files.forEach((file) => unitMocha.addFile(file))
				resolve()
			})
		});

		let connectToMockgoose = new Promise((resolve,reject) => {
			mockgoose(mongoose)
			.then(() => {
				mongoose.connect('',resolve);
			})
			.catch(reject)
		})
		Promise.all([
			loadedSchemas,
			loadedTests,
			connectToMockgoose
		]).then(() => {
			console.log('\nRunning unit tests'.underline.blue)
			unitMocha.run((failures) => {
				console.log('failuers: ', failures);
				if (failures) reject(failures)
				else resolve()
			})
		}).catch((e) => {
			console.log(e);
		})
	}
)

Promise.resolve()
	.then(runUnitTests)
	.then(() => {
		process.exit(0)
	})
	.catch((error) => {
		console.error(error)
		process.exit(error)
	})

