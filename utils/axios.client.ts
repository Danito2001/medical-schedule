import axios from 'axios';

const axiosClient = axios.create({
    baseURL: '/api'
})

axiosClient.interceptors.response.use(
	(response) => response,
	(error) => {
		if (
			error.response?.status === 401 &&
			window.location.pathname !== "/auth/login"
		) {
			window.location.href = "/auth/login";
		} else if (error.response?.status === 403) {
			window.location.href = "/auth/login";
		}
		return Promise.reject(error);
	},
);

export default axiosClient;