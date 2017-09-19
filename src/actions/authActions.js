import axios from './request.service';

const domain = `http://localhost:8000/`;

export function toggle() {
	return {
		type: "TOGGLE_LOGIN",
		payload: null
	}
}

export function login(details) {
	let { email, password } = details;
	return {
		type: "LOGIN",
		payload: axios.post(`${domain}auth/login`, { email, password })
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
		payload: axios.post(`${domain}auth/signup`, user)
	}
}

export function create(user) {
	return {
		type: "CREATE",
		payload: axios.post(`${domain}api/users`, user)
	}
}

export function remove(id) {
	return {
		type: "REMOVE_USER",
		payload: axios.delete(`${domain}api/users/${id}`)
	}
}

export function update(id,user) {
	for(let key of Object.keys(user)){
		if(!user[key]){
			delete user[key];
		}
	}
	return {
		type: "UPDATE",
		payload: axios.put(`${domain}api/users/${id}`, user)
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

export function get(id) {
	return {
		type: "GET_USER",
		payload: axios.get(`${domain}api/users/${id}`)
	}
}

export function fetch() {
	return {
		type: "FETCH_USERS",
		payload: axios.get(`${domain}api/users`)
	}
}