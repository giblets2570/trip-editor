const initialToken = localStorage.getItem('token');
const initialRole = localStorage.getItem('role');
export default function reducer(state={
	token: initialToken,
	user: {
		role: initialRole
	},
	checking_logged_in: false,
	logged_in: initialToken,
	login_screen: true,
	logging_in: false,
	signing_up: false,
	error: null
}, action) {
	switch(action.type) {
		case "TOGGLE_LOGIN": {
			return {...state, login_screen: !state.login_screen};
		}
		case "PASSWORD_WRONG": {
			return {...state, error: {message: "Both passwords must be equal"}};
		}
		case "LOGOUT": {
			localStorage.removeItem('token');
			localStorage.removeItem('role');
			return {...state, logged_in: false, token: null, user: {role: null}};
		}
		case "LOGIN_PENDING": {
			return {...state, logging_in: true};
		}
		case "LOGIN_REJECTED": {
			return {
				...state,
				logging_in: false,
				error: action.payload.data || action.payload.response.data
			};
		}
		case "LOGIN_FULFILLED": {
			localStorage.setItem('token', action.payload.data.token);
			localStorage.setItem('role', action.payload.data.user.role);
			return {
				...state, 
				logging_in: false,
				error: null,
				logged_in: true,
				token: action.payload.data.token,
				user: action.payload.data.user
			}
		}
		case "SIGNUP_PENDING": {
			return {...state, signing_up: true};
		}
		case "SIGNUP_REJECTED": {
			return {
				...state, 
				signing_up: false, 
				error: action.payload.data || action.payload.response.data
			};
		}
		case "SIGNUP_FULFILLED": {
			return {
				...state, 
				signing_up: false,
				error: null,
				logged_in: true,
				token: action.payload.data.token,
				user: action.payload.data.user
			}
		}
		case "CHECK_LOGGED_IN": {
			return {...state, checking_logged_in: true};
		}
		case "CHECK_LOGGED_IN_REJECTED": {
			localStorage.removeItem('token');
			localStorage.removeItem('role');
			return {
				...state, 
				checking_logged_in: false, 
				error: action.payload.data || action.payload.response.data,
				logged_in: false,
				token: null
			};
		}
		case "CHECK_LOGGED_IN_FULFILLED": {
			return {
				...state,
				user: action.payload.data
			}
		}
		default: {
			break;
		}
	}
	return state;
}