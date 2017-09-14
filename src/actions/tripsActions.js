import axios from './request.service';

const domain = `http://localhost:8000/`;

function axiosWrapper(axios) {

}

export function create(trip) {
	return {
		type: "CREATE_TRIP",
		payload: axios.post(`${domain}trips`, trip)
	}
}

export function fetch(trip) {
	return {
		type: "FETCH_TRIPS",
		payload: axios.get(`${domain}trips`)
	}
}