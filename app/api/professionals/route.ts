import axiosServer from "@/utils/axios.server";


export async function GET(req:Request) {

    const { searchParams } = new URL(req.url)

    const center = searchParams.get('centerId');
    const specialty = searchParams.get('specialtyId');
    const day = searchParams.get('day');

    try {

        const response = await axiosServer.get('/doctor/filtered', {
            params: {
                centerId: center,
                specialtyId: specialty,
                day: day
            }
        })

        return Response.json(response.data);

    } catch (error:any) {
        console.log(error)
        return Response.json(
            {
                message: "Error al obtener doctores"
            },
            {
                status: error?.response?.status || 500,
            }
        )
    }
}