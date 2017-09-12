import User from '../../api/user/user.model';

import users from './data/users.json';

/**
	* generateCreator
	* Generate a creator for the given Model
	* The creator can be used to make a new document
	*/
let generateCreator = (Model,formatter) => {
	let creator = async (doc) => {
		if (formatter) formatter(doc);
		doc = new Model(doc);
		await doc.save();
		return doc;
	}
	return creator;
}

/**
	* createDocuments
	* Create given documents with the provided creator
	* Place all created documents back in the provided object
	*/
let createDocuments = async (documents,creator) => {
  let promises = Object.keys(documents).map(async (key) => {
    documents[key] = await creator(documents[key]);
  });
  await Promise.all(promises);
};

/**
	* removeCollections
	* Remove all documents from collections associated with Models
	*/
let removeCollections = async (Models) => {
	let promises = Models.map(
		async (Model) => Model.remove({}).exec()
	);
	await Promise.all(promises);
}

/**
	* createPoint
	* Create a point from coordinates
	*/
let createPoint = (coordinates) => ({ type: 'Point', coordinates: coordinates });

/**
	* seed
	* Seed script to remove documents then create locations, routes and users
	*/
let seed = async () => {

	// Remove all data
	await removeCollections([User]);

	// We are now seeding data from app
	return;

	// Create locations
	// await createDocuments(locations,generateCreator(Location,locationFormatter));
	// function locationFormatter(location){
	// 	location.coordinates = createPoint(location.coordinates);
	// }

	// Create routes
	// await createDocuments(routes,generateCreator(Route,routeFormatter));
	// function routeFormatter(route){
	// 	route.waypoints.forEach((waypoint) => {
	// 		waypoint.location = locations[waypoint.location]
	// 	});
	// }

	// // Create users
	await createDocuments(users,generateCreator(User,userFormatter));
	function userFormatter(user){
		// user.route = routes[user.route];
		// user.coordinates = createPoint(user.coordinates);
	}

}

// Export seed script
module.exports = seed;