import axiosServer from "@/utils/axios.server";


export async function POST(req: Request) {

    const { startTime, endTime, days, doctorId } = await req.json()

    try {
        const response = await axiosServer.post('/doctor/set-availability', {
            startTime: startTime,
            endTime: endTime,
            days: days,
            doctorId: doctorId
        })

        return Response.json(response.data)
    } catch (error:any) {
        console.log(error)
        return Response.json(
            {
                message: "Dias o horas incorrectas"
            },
            {
                status: error?.response?.status || 500,
            }
        )
    }

}