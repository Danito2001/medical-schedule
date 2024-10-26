import axios from 'axios';
import { cookies } from "next/headers";

const baseURL = process.env.NEXT_API_BASE_URL || "https://medical-schedule-backend.onrender.com";

const axiosServer = axios.create({
    baseURL
})

const routesConfig = {
    auth: ["/users/login/"],
    appointments: ["/appointment/update-appointment", "/appointment/get-appointment", "/appointment", "/appointment/appointment-by-user"],
    specialties: ["/specialty", "/previsions", "/medical-center"],
	validationRut: ["/rut"],
	filteredProfessional: ["/doctor/filtered"]
};

const excludedRoutes = Object.values(routesConfig).flat()

axiosServer.interceptors.request.use(
    (config) => {
        const cookieStore = cookies();
		if (!excludedRoutes.includes(config.url || "")) {
			
            const token = cookieStore.get("authToken")?.value;

			if (!token) {
                cookieStore.delete('user')
                cookieStore.delete('authToken')
				throw new Error("Unauthorized");
			}
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

axiosServer.interceptors.response.use(
	(response) => response,
	(error) => {
        const cookieStore = cookies();
        
        if (error.response?.status === 403) {
            cookieStore.delete('user');
            cookieStore.delete('authToken');
          }
		if (error.response?.status === 401) {
			throw new Error("Unauthorized");
		}
		return Promise.reject(error);
	},
);

export default axiosServer;