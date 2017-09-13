export default function reducer(state={
	token: null,
	role: null,
	checking_logged_in: false,
	logging_in: false,
	signing_up: false,
	error: null
}, action) {
	switch(action.type) {
		case "LOGIN": {
			return {...state, logging_in: true};
		}
		case "LOGIN_REJECTED": {
			return {...state, logging_in: false, error: action.payload};
		}
		case "LOGIN_FULFILLED": {
			return {
				...state, 
				logging_in: false,
				token: action.payload.token,
				role: action.payload.role
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
				token: action.payload.token,
				role: action.payload.role
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
				token: action.payload.token,
				role: action.payload.role
			}
		}
		default: {
			break;
		}
	}
	return state;
}