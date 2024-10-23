import axiosServer from "@/utils/axios.server";
import { cookies } from "next/headers";

export async function GET(req: Request) {
    const cookieStore = cookies();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    const userCookie = cookieStore.get('user');
    const user = userCookie ? JSON.parse(userCookie.value) : null;

    if (!user || !id) {
        return Response.json(
            { message: "Usuario o ID no encontrado" },
            { status: 400 }
        );
    }

    try {
        const response = await axiosServer.get('/doctor/get-availability', {
            params: { id }
        });

        const newAvailability = response.data;


        if (newAvailability.length > 0) {
            newAvailability.forEach((availability: any) => {
                user.DoctorAvailability = {
                    startDateTime: availability.startDateTime,
                    endDateTime: availability.endDateTime,
                    days: availability.days || [],
                };
            });

            cookieStore.set("user", JSON.stringify(user), {
                path: '/',
            });
        }

        return Response.json(newAvailability);

    } catch (error: any) {
        console.log(error);
        return Response.json(
            { message: "Error al obtener la disponibilidad" },
            { status: error?.response?.status || 500 }
        );
    }
}
