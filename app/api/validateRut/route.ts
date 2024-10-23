import axiosServer from "@/utils/axios.server"

export async function POST(req:Request) {

    const { rut, previsionId } = await req.json()

   
    try {
        const response = await axiosServer.post('/rut', { 
            rut,
            previsionId
        });

        return Response.json(response.data)
    } catch (error: any) {
        return Response.json(
            {
                message: "Rut o prevision incorrectos"
            },
            {
                status: error?.response?.status || 500,
            }
        );
    }
}