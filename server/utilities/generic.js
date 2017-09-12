
/**
	* Get an objects id
	*/
export let getObjectId = (object) => (object._id ? object._id : object); 

/**
	* Get the string of an object id 
	*/
export let getObjectIdString = (object) => getObjectId(object).toString();

/**
	* Check if objects equal by object id 
	*/
export let objectsEqual = (object1,object2) => {
	if (object1 && object2){	
		return (getObjectIdString(object1) === getObjectIdString(object2));
	} else {
		return false;
	}
}

export let dateDaySearch = (date=Date.now()) => {
	let today = new Date((new Date(date)).toDateString());
	let tomorrow = new Date(today.valueOf() + 1000 * 60 * 60 * 24);
	return {$gte: today, $lt: tomorrow}
}

export class Logger {
	static log(...items){
		console.log('\t',...items)
	}
}

export let findIndex = (array,func) => {
	let element = array.find(func);
	return array.indexOf(element);
}

export let hashmap = (array) => {
	let map = array.reduce((cumlative,entry) => {
		cumlative[getObjectId(entry)] = entry;
		return cumlative;
	},{});
	return map;
}

export let removeRepeats = (_array) => {
	let array = _array.slice();
	for (var i = array.length - 2; i >= 0; i--) {
		if(array[i] === array[i+1]){
			array.splice(i+1,1);
		}
	}
	return array;
}


export let uniqueSet = (_array) => {
	let array = _array.slice();
	let temp = {};
	for (var i = array.length - 1; i >= 0; i--) {
		if(temp[getObjectIdString(array[i])]) array.splice(i,1);
		temp[getObjectIdString(array[i])] = true;
	}
	return array;
}