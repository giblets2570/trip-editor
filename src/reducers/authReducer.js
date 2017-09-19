const initialToken = localStorage.getItem('token')
const initialRole = localStorage.getItem('role')
export default function reducer(state={
	token: initialToken,
	users: [],
	user: {
		role: initialRole
	},
	checking_logged_in: false,
	logged_in: !!(initialToken && initialToken !== "null"),
	login_screen: true,
	logging_in: false,
	signing_up: false,
	error: null
}, action) {
	switch(action.type) {
		case "TOGGLE_LOGIN": {
			return {...state, login_screen: !state.login_screen}
		}
		case "PASSWORD_WRONG": {
			return {...state, error: {message: "Both passwords must be equal"}}
		}
		case "LOGOUT": {
			localStorage.removeItem('token')
			localStorage.removeItem('role')
			return {...state, logged_in: false, token: null, user: {role: null}}
		}
		case "LOGIN_PENDING": {
			return {...state, logging_in: true}
		}
		case "LOGIN_REJECTED": {
			return {
				...state,
				logging_in: false,
				error: 	
					(action.payload.response && action.payload.response.data ? action.payload.response.data.message : null) ||
					action.payload.message ||
					action.payload.data 
			}
		}
		case "LOGIN_FULFILLED": {
			localStorage.setItem('token', action.payload.data.token)
			localStorage.setItem('role', action.payload.data.user.role)
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
			return {...state, signing_up: true}
		}
		case "SIGNUP_REJECTED": {
			return {
				...state, 
				signing_up: false, 
				error: 	
					(action.payload.response && action.payload.response.data ? action.payload.response.data.message : null) ||
					action.payload.message ||
					action.payload.data 
			}
		}
		case "SIGNUP_FULFILLED": {
			console.log(action.payload);
			localStorage.setItem('token', action.payload.data.token)
			localStorage.setItem('role', action.payload.data.user.role)
			return {
				...state, 
				signing_up: false,
				error: null,
				logged_in: true,
				token: action.payload.data.token,
				user: action.payload.data.user
			}
		}
		case "CREATE_PENDING": {
			return {...state }
		}
		case "CREATE_REJECTED": {
			return {
				...state, 
				error: 	
					(action.payload.response && action.payload.response.data ? action.payload.response.data.message : null) ||
					action.payload.message ||
					action.payload.data 
			}
		}
		case "CREATE_FULFILLED": {
			return {
				...state,
				error: null,
				users: state.users.concat(action.payload.data)
			}
		}
		case "UPDATE_PENDING": {
			return {
				...state 
			}
		}
		case "UPDATE_REJECTED": {
			return {
				...state, 
				error: 	
					(action.payload.response && action.payload.response.data ? action.payload.response.data.message : null) ||
					action.payload.message ||
					action.payload.data 
			}
		}
		case "UPDATE_FULFILLED": {
			let updatedUsers = state.users.map((trip) => {
				if(trip._id === action.payload.data._id){
					return action.payload.data
				}
				return trip
			})
			return { ...state, error: null, users: updatedUsers }
		}
		case "CHECK_LOGGED_IN_PENDING": {
			return {...state, checking_logged_in: true}
		}
		case "CHECK_LOGGED_IN_REJECTED": {
			localStorage.removeItem('token')
			localStorage.removeItem('role')
			return {
				...state, 
				checking_logged_in: false, 
				logged_in: false,
				token: null,
				error: 	
					(action.payload.response && action.payload.response.data ? action.payload.response.data.message : null) ||
					action.payload.message ||
					action.payload.data
			}
		}
		case "CHECK_LOGGED_IN_FULFILLED": {
			return {
				...state,
				user: action.payload.data
			}
		}
		case "FETCH_USERS_PENDING": {
			return { ...state }
		}
		case "FETCH_USERS_REJECTED": {
			return { 
				...state, 
				error: 	
					(action.payload.response && action.payload.response.data ? action.payload.response.data.message : null) ||
					action.payload.message ||
					action.payload.data 
			}
		}
		case "FETCH_USERS_FULFILLED": {
			return { ...state,users: action.payload.data }
		}
		case "REMOVE_USER_PENDING": {
			return {...state, loading: true}
		}
		case "REMOVE_USER_REJECTED": {
			return {
				...state, 
				loading: false, 
				error: 	
					(action.payload.response && action.payload.response.data ? action.payload.response.data.message : null) ||
					action.payload.message ||
					action.payload.data 
			}
		}
		case "REMOVE_USER_FULFILLED": {
			const newUsers = state.users.filter((user) => user._id !== action.payload.data._id)
			return {
				...state, 
				users: newUsers
			}
		}
		case "GET_USER_PENDING": {
			return {...state, loading: true}
		}
		case "GET_USER_REJECTED": {
			return {
				...state, 
				loading: false, 
				error: 	
					(action.payload.response && action.payload.response.data ? action.payload.response.data.message : null) ||
					action.payload.message ||
					action.payload.data 
			}
		}
		case "GET_USER_FULFILLED": {
			let newUsers = state.users
							.filter((user) => user._id === action.payload.data._id)
							.concat(action.payload.data)
			return {
				...state, 
				users: newUsers
			}
		}
		default: {
			break
		}
	}
	return state
}