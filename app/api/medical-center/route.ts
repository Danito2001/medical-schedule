import axiosServer from "@/utils/axios.server";

export async function GET(req:Request) {

    try {

        const response = axiosServer.get('/medical-center')

        return Response.json((await response).data)
    } catch (error:any) {

        console.log(error)
        return Response.json(
            {
                message: "No se han encontrado centros medicos"
            },
            {
                status: error?.response?.data?.status || 500
            }
        )
    }
}
