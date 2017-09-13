import { combineReducers } from "redux"

import auth from "./authReducer"
import trips from "./tripsReducer"

export default combineReducers({
	auth,
	trips
})