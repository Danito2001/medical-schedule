import axiosServer from "@/utils/axios.server"


export async function POST(req:Request) {

    const { rut, numberAppointment } = await req.json()

    try {
        const response = await axiosServer.post('/appointment/get-appointment', {
            rut, 
            numberAppointment
        })

        return Response.json(response.data)
    } catch (error:any) {
        console.log(error)
        return Response.json(
            {
                message: "Error al intentar obtener la cita"
            },
            {
				status: error?.response?.status || 500,
            }
        )
    }

}