import { combineReducers } from "redux"

import auth from "./authReducer"
import navHeader from "./navHeaderReducer"

export default combineReducers({
	auth,
	navHeader
})