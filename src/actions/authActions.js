import axios from 'axios';

const domain = `http://localhost:8000/`;

export function login(email, password) {
	return {
		type: "LOGIN",
		payload: axios.post(`${domain}auth/login`,{
			email: email,
			password: password
		})
	}
}

export function logout() {
	return {
		type: "LOGOUT",
		payload: null
	}
}

export function singup() {
	return {
		type: "SIGNUP_FULFILLED",
		payload: {
			"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OGE2Y2IyYjYxY2NmYTA5ZjFmOWM5NjUiLCJyb2xlIjoidXNlciIsImlhdCI6MTUwNTMwNDkzNiwiZXhwIjoxNTA1MzIyOTM2fQ.FlF7Huc6Vvt2VkA8dEsr83zqplgUojIHsY5TbPzTP7E"
		}
	}
}

export function isLoggedIn() {
	return {
		type: "CHECK_LOGGED_IN",
		payload: axios.get(`${domain}auth/loggedin`, {
			headers: {
				'Authorization': localStorage.token
			}
		})
	}
}