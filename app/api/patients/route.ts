import axiosServer from "@/utils/axios.server"

export async function GET(req:Request) {
    
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')


    try {
        
        const response = await axiosServer.get('/doctor/get-patients', {
            params: {
                id: id
            }
        })

        return Response.json(response.data)

    } catch (error:any) {
        console.log(error)
        return Response.json(
            {
				message: "Email o contraseña incorrectos",
            },
            {
                status: error?.response?.status || 500
            }
        )
    }
}
