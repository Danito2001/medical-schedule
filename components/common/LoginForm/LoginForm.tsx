'use client';

import Link from "next/link"
import { Button, Input } from "@nextui-org/react"
import { useForm } from "@/hooks/useForm"
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline"
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { customSwal } from "@/helpers/custom_swal";
import ReactDOMServer from "react-dom/server";


export default function LoginForm({Info}: {Info:JSX.Element}) {

    const pathname = usePathname();

    const { onChangeInput, formData, handleLoginForm, errors, statusError, isLoading } = useForm({
        initialFields: {
            email: '',
            password: ''
        }
    });

    useEffect(() => {
        
        if (pathname === '/auth/login') {
            customSwal({
                title: 'Información',
                html: ReactDOMServer.renderToString(Info),
                error: "info"
            })
        }
        
    }, [Info, pathname])
    

    return (
        <form
            className="bg-white p-10 space-y-10 rounded-lg"
            onSubmit={handleLoginForm}
        >
            <div className="text-center">
                <h2 className="text-3xl font-semibold text-blue-500">Login</h2>
                <span className="opacity-70">Inicia sesion para ver tus solicitudes</span>
            </div>
            <div className="space-y-10">
                <Input
                    label="Correo"
                    labelPlacement="outside"
                    placeholder="Ingrese su correo"
                    className="border border-black rounded-xl"
                    classNames={{
                        inputWrapper: 'bg-blue-200',
                    }}
                    name="email"
                    validate={formData.email}
                    onChange={onChangeInput}
                />
                {errors && <span className="text-red-500">{errors.email}</span>}
                <Input
                    label="Contraseña"
                    labelPlacement="outside"
                    type="password"
                    placeholder="Ingrese su contraseña"
                    className="border border-black rounded-xl"
                    classNames={{
                        inputWrapper: 'bg-blue-200',
                    }}
                    name="password"
                    value={formData.password}
                    onChange={onChangeInput}
                />
                {errors && <span className="text-red-500">{errors.password}</span>}
                {statusError && <span className="text-red-500">{statusError}</span>}
            </div>
            <div className="flex flex-col items-center space-y-2">
                <Button
                    disabled={isLoading}
                    type="submit"
                    className="bg-blue-500 text-white"
                >
                    {
                        (!isLoading) ? 'Iniciar sesion' : 'Cargando...'
                    }
                    
                </Button>
                <div className="text-center space-y-2">
                    <div className="flex flex-col md:flex-row md:space-x-1">
                        <span>¿No tienes cuenta?</span>
                        <span className="underline cursor-pointer">Crear cuenta</span>
                    </div>
                    <Link
                        href={'/'}
                        className="flex justify-center"
                    >
                        <ArrowLeftCircleIcon width={24} />
                        Regresar
                    </Link>
                </div>
            </div>
        </form>
    )

}