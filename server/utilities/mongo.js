'use strict';

import mongoose from 'mongoose';
import bluebird from 'bluebird';
import GeoJson from 'mongoose-geojson-schema';
import loadClass from 'mongoose-class-wrapper';

mongoose.Promise = bluebird;

// Useful types
Mongo.ObjectId = mongoose.Schema.Types.ObjectId;
Mongo.Mixed = mongoose.Schema.Types.Mixed;

Mongo.generateId = function(){
  return mongoose.mongo.ObjectId(mongoose.Types.ObjectId());
}

// GeoJson types
Mongo.Point = mongoose.Schema.Types.Point;

// Function to add querys
function addQuerys(schema,_class){
	// Add middleware querys
	if (_class.querys && typeof _class.querys == 'object') {
		for (var queryMethod in _class.querys) {
			schema.query[queryMethod] = _class.querys[queryMethod]
		}
	}
}

function Mongo(name, _class){
  let schema = new mongoose.Schema({},{
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  });
  schema.plugin(loadClass, _class);
  schema.plugin(addQuerys, _class);
  return mongoose.model(name, schema);
}

export default Mongo;