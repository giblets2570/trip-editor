var colors = require('colors')
var path = require('path')
var glob = require('glob')
var Mocha = require('mocha')
var coMocha = require('co-mocha')
coMocha(Mocha)

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


// Create function to expect generator error
global.expectError = function*(generator){
	let threwError = false
	try { generator() }
	catch (error) { threwError = true }
	expect(threwError).to.be.true
}

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
			glob("./**/*.schema{,s}.js", function (error, files) {
				if (error) return reject(error)
				files.forEach((file) => require(file.replace('server','')))
				resolve()
			})
		})

		// Find files and run all tests
		let loadedTests = new Promise((resolve,reject) => {
			glob("./server/**/*.spec.js", function (error, files) {
				if (error) return reject(error)
				files.forEach((file) => unitMocha.addFile(file))
				resolve()
			})
		})
		Promise.all([
			loadedSchemas,
			loadedTests,
		]).then(() => {
			console.log('\nRunning unit tests'.underline.blue)
			unitMocha.run((failures) => {
				if (failures) reject(failures)
				else resolve()
			})
		})
	}
)

Promise.resolve()
	.then(runUnitTests)
	// .then(runIntegrationTests)
	.then(() => {
		process.exit(0)
	})
	.catch((error) => {
		console.error(error)
		process.exit(error)
	})

