import Mongo from './mongo';

class Model {
	equals(other){
		if (typeof other === 'object'){
			other = other._id || other;
			other = other.toString();
		}
		return (other === this._id.toString());
	}
}

Model.schema = {
	name: {
		type: String,
		default: ''
	},
	date: {
		type: Date,
		default: Date.now
	}
}

module.exports = Model;