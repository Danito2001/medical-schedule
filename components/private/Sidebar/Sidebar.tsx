'use client';

import { useState } from "react";
import Image from "next/image";

import classNames from "classnames";
import Swal from 'sweetalert2'
import { Button } from "@nextui-org/react";
import { userService } from "@/services/user";
import { userContext } from "@/context/user.context";
import { ArrowLeftStartOnRectangleIcon, XMarkIcon, BellIcon, UserGroupIcon, ClockIcon, ChevronRightIcon, Bars3Icon } from "@heroicons/react/24/outline";

interface Props {
    currentSection: React.ReactNode;
    onPatient: () => void
    onAvailability: () => void
}

export default function Sidebar({currentSection, onPatient, onAvailability}: Props) {

    const [ isOpen, setIsOpen ] = useState(false)
    const [ isLoading, setIsLoading ] = useState(false)
    const { logout } = userService();

    const { user } = userContext();

    if (!user) return null;

    const handleLogout = async () => {
        setIsLoading(true);

        try {
            await logout(); 
            setIsLoading(false);
            Swal.fire({ 
                title: 'Sesion cerrada con exito',
                icon: 'success'
            })
        } catch (error:any) {
            console.log("Error al cerrar sesión:", error)
            Swal.fire({
                title: 'Error al cerrar sesión',
                text:error?.response?.data?.message,
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };


    return (
        <div className="fixed z-10">

            <div 
                className="absolute p-2"
                onClick={() => setIsOpen(true)}
            >
                <Bars3Icon width={26}/>
            </div>
            <nav className={classNames("relative bg-blue-500 h-[100vh] transition-width duration-200",
                { 
                    'w-0 opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto lg:block lg:w-[120px]': !isOpen, 
                    'w-[180px] lg:w-[230px]': isOpen 
                })}>

                {/* X button */}
                <div className="absolute top-4 right-4">
                    <button onClick={() => setIsOpen(prevState => !prevState)}>
                        {isOpen ? <XMarkIcon width={24} /> : <ChevronRightIcon width={24} />}
                    </button>
                </div>
                <div className="flex flex-col justify-between items-center h-full pt-10">
                    <div className="flex flex-col items-center space-y-12 text-white flex-grow">
                        {/* Profile */}
                        <div className="text-center">
                            <div className="rounded-full overflow-hidden w-[100px] h-[100px] mx-auto">
                                <Image
                                    src={'/imgs/self_doctor.jpg'}
                                    alt="Doctor 2"
                                    width={100}
                                    height={100}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <span className="font-semibold text-md block min-h-[1.5em]">
                                {user.name} <br />
                                {user.lastName}
                            </span>
                        </div>
                        {/* Center items */}
                        <div className="flex flex-col items-center space-y-2">
                            {/* className={`w-[160px] lg:w-[200px] ${currentSection === 'patient' ? "bg-gray-400" : 'bg-white'}`} */}
                            <Button 
                                className={classNames(`${currentSection === 'patient' ? "bg-gray-400" : 'bg-white'}`, 
                                    {'w-[160px] lg:w-[180px]': isOpen})}
                                onClick={onPatient}
                            >
                                <UserGroupIcon width={26} />
                                {isOpen && 'Pacientes'}
                            </Button>
                            <Button 
                               className={classNames(`${currentSection === 'availability' ? "bg-gray-400" : 'bg-white'}`, 
                                {'w-[160px] lg:w-[180px]': isOpen})}
                                onClick={onAvailability}
                            >
                                <ClockIcon width={26} />
                                {isOpen && 'Disponibilidad'}
                            </Button>
                        </div>
                    </div>
                    {/* End items */}
                    <div className="pb-10">
                        <Button
                            disabled={isLoading}
                            className="bg-pink-600 text-white"
                            onClick={handleLogout}
                        >
                            {
                                (!isLoading)
                                    ? <ArrowLeftStartOnRectangleIcon width={24} />
                                    : <XMarkIcon width={24} />
                            }

                            {
                                (isOpen)
                                    ? !isLoading ? 'Cerrar sesion' : 'Cerrando sesion..'
                                    : null
                            }
                        </Button>
                    </div>
                </div>
            </nav>
        </div>

    )

}