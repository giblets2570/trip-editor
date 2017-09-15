import axios from './request.service';

const domain = `http://localhost:8000/`;

export function fetch(query={}) {
	return {
		type: "FETCH_TRIPS",
		payload: axios.get(`${domain}trips`, {params: query})
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

export function remove(id) {
	return {
		type: "REMOVE_TRIP",
		payload: axios.delete(`${domain}trips/${id}`)
	}
}

export function updateFilters(newFilters) {
	return {
		type: "UPDATE_FILTERS",
		payload: newFilters
	}
}