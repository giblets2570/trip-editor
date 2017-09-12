const DEBUG = true;
let log = (...args) => DEBUG ? console.log(...args) : null

// This is always useful
Array.prototype.contains = function(item) {
	return (this.indexOf(item) > -1);
};

// Could this route be useful for this schedule
let checkRouteScheduleSuitbility = (route,schedule) => (
		( route.length > 1) &&
		( schedule.length > 1 ) &&
		( route[0] === schedule[0] ) &&
		( route.includes(schedule[1]) )
	)

// Could this route be useful for all these schedules
let checkRouteSchedulesSuitbility = (route,schedules) => {
	return (
		( route.length > 1) &&
		( schedules.length > 0) &&
		schedules.every(
			(schedule) => checkRouteScheduleSuitbility(route,schedule)
		)
	)
}

// Move the given schedule along the route
let moveScheduleAlongRoute = (schedule,route) => {
	if (schedule.length < 2){
		throw Error('Schedule not long enough to move')
	}
	if (route.length < 2){
		throw Error('Route not long enough to move')
	}
	if (route[0] !== schedule[0]){
		throw Error('Route and schedule not the same location')
	}
	// If this route filfills the schedule move it
	if (schedule[1] === route[1]){
		schedule.splice(0,1);
	// Else just move along route
	} else {
		schedule[0] = route[1]
	}

}

// Moves a list of scheduls along the route
let moveSchedulesAlongRoute = (schedules,route) => {
	for (let schedule of schedules){
		moveScheduleAlongRoute(schedule,route);
	}
	// Pop a value off the route
	route.splice(0,1);
}

// Find all combinations of an array
let combinations = (array) => {
	let result = [];
	for (var i = 0; i < Math.pow(2, array.length); i++) {
	    var bin = (i).toString(2), set = [];
	    bin = new Array((array.length-bin.length)+1).join("0")+bin;
	    for (var j = 0; j < bin.length; j++) {
	        if (bin[j] === "1") {
	            set.push(array[j]);
	        }
	    }
	    result.push(set);
	}
	return result;
}

// Are all schedules as their final location
let isResultComplete = (result) => result.schedules.every((schedule) => (schedule.length < 2));

// Deep copy a nested array
let deepCopy = (nestedArray) => nestedArray.map((subArray) => subArray.slice());

// Run a single step and update the result
// Callback function actually does the step
let runStep = (_routes,_schedules,result,run) => {

	// create copy to run this step with
	let routes = deepCopy(_routes);
	let schedules = deepCopy(_schedules);

	// Run the step
	let move = run(routes,schedules);

	// Access lower results
	Object.assign(result,simulate(routes,schedules));

	// Insert move record to result
	result.record.splice(0,0,move);

	// Return if solution reachable
	return isResultComplete(result);

}

// Count the number of remaining schedule stages
let countScheduleStages = (schedules) => schedules.reduce((sum,schedule) => sum + schedule.length,0);

// This is the main function to simulate routes and schedules
/**
	*	@param routes
	[
		// Route 1 (current location is location1)
		['location1','location2'],
		// Route 2 (current location is location2)
		['location2','location3']
	]
	*	@param schedules
	[
		// Schedule 1 (current location is location1)
		['location1','location2'],
		// Schedule 2 (current location is location2)
		['location2','location3']
	]
	*/
let simulate = (_routes,_schedules) => {

	// Log the current routes and schedules
	log(_routes,_schedules);

	// Copy the routes and schedules
	let routes = deepCopy(_routes);
	let schedules = deepCopy(_schedules);

	// Defult result object
	let result = {
		complete: false,
		routes: routes,
		schedules: schedules,
		record: []
	}

	return result;

	// Let us store the best running result (minimise schedule)
	let storeResult = (_result) => {
		let _scheduleStages = countScheduleStages(_result.schedules);
		let scheduleStages = countScheduleStages(result.schedules);
		if (_scheduleStages < scheduleStages){
			// Store this shiz by value not reference
			result = {
				complete: _result.complete,
				routes: deepCopy(_result.routes),
				schedules: deepCopy(_result.schedules),
				record: _result.record.map((step) => ({
					route: step.route,
					devices: step.devices.slice(),
					start: step.start,
					end: step.end,
				}))
			};
		}
	}

	// If all schedules are at thier last location return result
	if (isResultComplete(result)){
		result.complete = true;
		return result;
	};

	// Loop all routes and select what to move
	for (let i=0; i<routes.length; i++){
		let complete;
		let _result = {};
		let route = routes[i];

		// If this route is on the last stop skip past it
		log('Looking at route',route);
		if (route.length < 2){
			continue;
		}

		// Select as many schedules as possible
		let scheduleIndexes = [];
		for (let j=0; j<schedules.length; j++){
			if (checkRouteScheduleSuitbility(route,schedules[j])){
				scheduleIndexes.push(j);
			}
		}

		// Acces the subset of schedules usind the indexes
		let schedulesSubset = scheduleIndexes.map((scheduleIndex) => schedules[scheduleIndex]);

		// Double check that the schedules are suitable 
		if (checkRouteSchedulesSuitbility(route,schedulesSubset)){				
			// Run a single step which moves them along the route
			complete = runStep(routes,schedules,_result,(__routes,__schedules) => {
				let __schedulesSubset = scheduleIndexes.map((scheduleIndex) => __schedules[scheduleIndex]);
				log('moving devices',__schedulesSubset,'along route',route);
				moveSchedulesAlongRoute(__schedulesSubset,__routes[i]);
				return {
					start: route[0],
					end: route[1],
					devices: scheduleIndexes,
					route: i
				}
			});
			// If we have completed return the result 
			if (complete){
				return _result;
			// Otherwise store the best attempt
			} else {
				storeResult(_result);
			}
		}

		// Here we are just going to step along the route wihtout a deivce
		complete = runStep(routes,schedules,_result,(__routes,__schedules) => {
			log('moving along route',route);
			__routes[i].splice(0,1);
			return {
				start: route[0],
				end: route[1],
				devices: [],
				route: i
			}
		});
		// If we have completed return the result 
		if (complete){
			return _result;
		// Otherwise store the best attempt
		} else {
			storeResult(_result);
		}
	}

	return result;

}


export default simulate