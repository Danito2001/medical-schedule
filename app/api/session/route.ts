import axiosServer from "@/utils/axios.server";
import { cookies } from "next/headers";


export async function GET(_:Request) {

    const cookieStore = cookies()

    const token = cookieStore.get('authToken')?.value;
    const user = cookieStore.get('user')?.value;

    const userCookie = user ? JSON.parse(user) : null;

    try {
        
        if (!token || !user) {
            return Response.json(
                {
                    message: "Invalid session"
                },
                {
                    status: 401
                }
            )
        }

        const response = await axiosServer.get('/appointment/appointment-by-user', {
            params: {
                id: userCookie.id
            }
        })

        const userData = {
            ...userCookie,
            appointment: response.data
        };

        return Response.json(userData);
    } catch (error) {
        console.log(error)
        Response.json(
            {
                message: "Ha ocurrido un error al obtener la sesión"
            },
            {
                status: 500
            }
        )
    }
}