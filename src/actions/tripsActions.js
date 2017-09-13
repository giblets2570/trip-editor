import axios from 'axios';

const domain = `http://localhost:8000/`;

export function create(trip) {
	return {
		type: "CREATE_TRIP",
		payload: axios.post(`${domain}trips`, trip, {
			headers: {
				'Authorization': "Bearer " + localStorage.token
			}
		})
	}
}

export function fetch(trip) {
	return {
		type: "FETCH_TRIPS",
		payload: axios.get(`${domain}trips`,{
			headers: {
				'Authorization': "Bearer " + localStorage.token
			}
		})
	}
}