import axiosServer from "@/utils/axios.server"


export async function PUT(req: Request) {

    const { numberAppointment, rut, status } = await req.json()

    try {
        
        const response = await axiosServer.put('/appointment/update-appointment', {
            numberAppointment,
            rut,
            status
        })

        return Response.json(response.data)

    } catch (error: any) {
        console.log(error)
        return Response.json(
            {
                message: "Error al actualizar la cita"
            },
            {
				status: error?.response?.status || 500,
            }
        )
    }

}