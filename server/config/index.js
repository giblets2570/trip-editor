const NODE_ENV = process.env.NODE_ENV || 'development'

let config = {
	port: process.env.PORT || 8000,
	debug: (NODE_ENV === 'development'),
	seed:  process.env.hasOwnProperty('SEED') ? (process.env.SEED === 'true') : false,
	mongo: {
		uri: process.env.MONGOLAB_URI
	},
	secrets: {
		session: process.env.SECRET
	},
	userRoles: ['user','manager','admin']
}

switch (NODE_ENV){
	case 'test':
		config.mongo.uri = process.env.MONGOLAB_URI_TEST || 'mongodb://localhost:27017/repairly-routing-test'
	break
	case 'development':
		config.mongo.uri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/repairly-routing-dev'
	break
}

export default config