export default function reducer(state={
	token: null,
	role: null,
	checking_logged_in: false,
	logging_in: false,
	logged_in: false,
	signing_up: false,
	error: null
}, action) {
	switch(action.type) {
		case "LOGIN_PENDING": {
			return {...state, logging_in: true};
		}
		case "LOGIN_REJECTED": {
			return {...state, logging_in: false, error: action.payload};
		}
		case "LOGIN_FULFILLED": {
			console.log(action.payload);
			return {
				...state, 
				logging_in: false,
				error: null,
				token: action.payload.data.token,
				role: action.payload.data.role
			}
		}
		case "SIGNUP": {
			return {...state, signing_up: true};
		}
		case "SIGNUP_REJECTED": {
			return {...state, signing_up: false, error: action.payload};
		}
		case "SIGNUP_FULFILLED": {
			return {
				...state, 
				signing_up: false,
				token: action.payload.data.token,
				role: action.payload.data.role
			}
		}
		case "CHECK_LOGGED_IN": {
			return {...state, checking_logged_in: true};
		}
		case "CHECK_LOGGED_IN_REJECTED": {
			return {...state, checking_logged_in: false, error: action.payload};
		}
		case "CHECK_LOGGED_IN_FULFILLED": {
			return {
				...state, 
				checking_logged_in: false,
				logged_in: true,
				error: null,
				token: action.payload.data.token,
				role: action.payload.data.role
			}
		}
		default: {
			break;
		}
	}
	return state;
}