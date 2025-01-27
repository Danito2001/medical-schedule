import { LoginForm } from "@/components/common/LoginForm";
import React from "react";


export default function Login() {

    const Info: React.FC = () => (
        <div className="text-start text-sm space-y-2">
            <p>Información sobre los correos y contraseñas de los profesionales:</p>
            <li>Los correos siguen el formato: doctorNUMERO@gmail.com, donde NUMERO varía del 1 al 20.</li>
            <li>Las contraseñas son iguales para todos: <b>password123</b>.</li>
        </div>
    );
      
    
    return (
        <div className="bg-blue-500">
            <div className="flex min-h-screen items-center justify-center pb-10">
                <LoginForm Info={<Info/>}/>
            </div>
        </div>
    )

}