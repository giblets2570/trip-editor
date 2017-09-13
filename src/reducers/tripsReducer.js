export default function reducer(state={
	trips: [],
	loading: false,
	error: null
}, action) {
	switch(action.type) {
		case "CREATE_TRIP_PENDING": {
			return {...state, loading: true};
		}
		case "CREATE_TRIP_REJECTED": {
			return {...state, loading: false, error: action.payload.data};
		}
		case "CREATE_TRIP_FULFILLED": {
			return {...state, trips: state.trips.concat(action.payload.data)}
		}
		case "FETCH_TRIPS_PENDING": {
			return {...state, loading: true};
		}
		case "FETCH_TRIPS_REJECTED": {
			return {...state, loading: false, error: action.payload.data};
		}
		case "FETCH_TRIPS_FULFILLED": {
			return {...state, trips: action.payload.data}
		}
		default: {
			break;
		}
	}
	return state;
}