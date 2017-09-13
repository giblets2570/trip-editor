import { compose, applyMiddleware, createStore } from "redux"
import { persistStore, autoRehydrate } from "redux-persist"

import { createLogger }  from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"

import reducer from "./reducers"

const middleware = applyMiddleware(promise(), thunk, createLogger())

const store = createStore(
	reducer, 
	undefined,
	compose(
		middleware,
		// autoRehydrate()
	)
)

// persistStore(store);

export default store;