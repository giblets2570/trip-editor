export default function reducer(state={
	trips: [],
	filters: {
		destination: "",
		startDate: null,
		endDate: null,
	},
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
		case "UPDATE_TRIP_PENDING": {
			return {...state, loading: true};
		}
		case "UPDATE_TRIP_REJECTED": {
			return {...state, loading: false, error: action.payload.data};
		}
		case "UPDATE_TRIP_FULFILLED": {
			let updatedTrips = state.trips.map((trip) => {
				if(trip._id === action.payload.data._id){
					return action.payload.data;
				}
				return trip;
			});
			return {...state, trips: updatedTrips}
		}
		case "REMOVE_TRIP_PENDING": {
			return {...state, loading: true};
		}
		case "REMOVE_TRIP_REJECTED": {
			return {...state, loading: false, error: action.payload.data};
		}
		case "REMOVE_TRIP_FULFILLED": {
			console.log(state.trips);
			console.log(action.payload);
			const newTrips = state.trips.filter((trip) => trip._id !== action.payload.data._id);
			return {
				...state, 
				trips: newTrips
			}
		}
		case "UPDATE_FILTERS": {
			return {...state, filters: action.payload}
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