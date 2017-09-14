import axios from './request.service';

const domain = `http://localhost:8000/`;

export function fetch(trip) {
	return {
		type: "FETCH_TRIPS",
		payload: axios.get(`${domain}trips`)
	}
}

export function create(trip) {
	return {
		type: "CREATE_TRIP",
		payload: axios.post(`${domain}trips`, trip)
	}
}

export function update(id, trip) {
	return {
		type: "UPDATE_TRIP",
		payload: axios.put(`${domain}trips/${id}`, trip)
	}
}

export function updateFilters(newFilters) {
	return {
		type: "UPDATE_FILTERS",
		payload: newFilters
	}
}