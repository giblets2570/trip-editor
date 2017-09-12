import { getObjectId, objectsEqual } from '../../utilities/generic';

import Model from '../../utilities/model';
import Mongo from '../../utilities/mongo';

class UserModel extends Model {
	pickup(device,location){
		if (objectsEqual(this,device.agent)){
			throw Error('The device is already in the agents posetion');
		};
		location.release(device);
		device.agent = this;
	}
	photograph(device,location){
		console.log('PHOTO OPPORTUNITY');
	}
	dropoff(device,location){
		if (!objectsEqual(this,device.agent)){
			throw Error('The agent does not have this device');
		};
		location.recieve(device);
		device.agent = undefined;
	}
	get allowedActions(){
		return ['pickup','photograph','dropoff','sign']
	}
}

UserModel.schema = {
	reference: {
		type: String,
		required: true
	},
	route: {
		ref: 'Route',
		type: Mongo.ObjectId
	},
	role: {
		type: String, 
		enum: [
			'user',
			'manager',
			'admin'
		],
		default: 'user'
	}
}


module.exports = Mongo('User',UserModel);