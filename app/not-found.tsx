'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { NotFoundComponent } from "@/components/common/NotFound";

export default function NotFound() {

    const router = useRouter()

    useEffect(() => {
        
        const time = setTimeout(() => {
            router.push('/')
        }, 4000);
        
        return clearTimeout(time);
    }, [])
    

    return (
        <div>
            <NotFoundComponent 
                title={"404"} 
                firstText={"¡Lo sentimos! No pudimos encontrar esta página"} 
                secondText={"Pero no te preocupes, puedes buscar en la página de inicio"}                
                textButton={"Regresar al inicio"} 
                image={'not-found.png'} 
                href="/"
            />
        </div>
    )

}