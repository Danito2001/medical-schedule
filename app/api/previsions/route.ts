export const dynamic = 'force-dynamic';

import axiosServer from "@/utils/axios.server";


export async function GET(_:Request) {

    try {
        const response = await axiosServer.get('/previsions')

        return Response.json(response.data)
    } catch (error:any) {
        console.log(error)
        return Response.json(
            {
                message: "Error al obtener las previsiones medicas"
            },
            {
                status: error?.response?.status || 500
            }
        )
    }

}