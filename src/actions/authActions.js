import axios from './request.service';

const domain = `http://localhost:8000/`;

export function toggle() {
	return {
		type: "TOGGLE_LOGIN",
		payload: null
	}
}

export function login(details) {
	return {
		type: "LOGIN",
		payload: axios.post(`${domain}auth/login`, details)
	}
}

export function passwordWrong() {
	return {
		type: "PASSWORD_WRONG",
		payload: null
	}
}

export function logout() {
	return {
		type: "LOGOUT",
		payload: null
	}
}

export function signup(user) {
	return {
		type: "SIGNUP",
		payload: axios.post(`${domain}users`, user)
	}
}

export function isLoggedIn() {
	if(localStorage.token && localStorage.token !== 'null'){
		return {
			type: "CHECK_LOGGED_IN",
			payload: axios.get(`${domain}auth/loggedin`)
		}
	}else{
		return { type: "NULL"}
	}
}


