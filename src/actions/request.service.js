import axios from 'axios';

// Add a request interceptor
axios.interceptors.request.use(function (config) {
	// Do something before request is sent
	console.log(config);
	config.headers.Authorization =  "Bearer " + localStorage.token
	return config;
}, function (error) {
	// Do something with request error
	return Promise.reject(error);
});


export default axios;