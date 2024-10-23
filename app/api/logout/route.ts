import { cookies } from "next/headers";


export async function POST(_: Request) {

    const cookieStore = cookies();

    try {
        cookieStore.set('authToken', '', {
            httpOnly: true,
            maxAge: 0
        })
        cookieStore.set('user', '', {
            maxAge: 0
        })
        
		return Response.json({ message: "Sesión cerrada" });
    } catch (error:any) {

        return Response.json(
            {
                message: 'Error al intentar hacer logout'
            },
            {
                status: error?.response?.status || 500
            }
        )
    }
}