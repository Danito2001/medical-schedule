import { cookies } from "next/headers";
import axiosServer from "@/utils/axios.server";

export async function POST(request: Request) {
	
	try {
		const cookieStore = cookies();
		const { email, password } = await request.json();

		const response = await axiosServer.post("/users/login/", {
			email,
			password,
		});

		const { token, user } = response.data;
		const { appointment, ...newResponse } = user;

		cookieStore.set("authToken", token, {
			httpOnly: true,
			path: '/'
		});

		cookieStore.set("user", JSON.stringify(newResponse), {
            path:'/'
        });

		return Response.json(response.data)
	} catch (error:any) {
		console.error(error);
		return Response.json(
			{
				message: "Email o contraseña incorrectos",
			},
			{
				status: error?.response?.status || 500,
			},
		);
	}
}
