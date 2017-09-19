import Model from '../../utilities/model'
import Mongo from '../../utilities/mongo'

class TripModel extends Model {}

TripModel.schema = {
	destination: String,
	comments: String,
	startDate: Date,
	endDate: Date,
	user: {
		type: Mongo.ObjectId,
		ref: 'User'
	}
}


export default Mongo('Trip',TripModel)