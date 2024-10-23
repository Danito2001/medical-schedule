import axiosServer from "@/utils/axios.server"


export async function POST(req: Request) {

    const { date, profesionalId, centerId, rut, specialtyId } = await req.json();

    try {
        
        const response = await axiosServer.post('/appointment', {
            date,
            profesionalId,
            centerId,
            rut,
            specialtyId
        })

        return Response.json(response.data)
    } catch (error:any) {
        console.log(error)
        return Response.json(
            {
                message: "Error al obtener la cita medica, comuniquese con el administrador"
            },
            {
                status: error?.response?.status || 500
            }
        )
    }
}