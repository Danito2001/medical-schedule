import Link from "next/link";
import { BeakerIcon } from "@heroicons/react/24/solid";

export default function MedicalAppointment() {


    return (
        <div className="flex flex-col px-4 space-y-10">
            <div className="pt-14">
                <h1 className="text-2xl text-blue-500 font-bold pb-4">Reserva de horas online</h1>
                <p className="pb-10">Si necesitas pedir una hora en nuestro sitio web puedes hacerlo de forma rápida, fácil y sencilla, desde cualquier dispositivo. Tenemos todos los servicios de salud a tu disposición <b className="text-blue-500">¡Agenda tu hora hoy mismo!</b></p>
                <div className="flex flex-col lg:flex-row items-center justify-center space-y-4 lg:space-y-0 lg:space-x-4 transition-colors duration-300">
                    <div className="relative flex items-center justify-center w-[300px] p-6 bg-gray-100 rounded-lg shadow-md">
                        <Link href={'/medical_consultation/patient_information'}>
                            <button className="p-6 rounded-lg pr-14 group">
                                <BeakerIcon className="mx-auto" width={20} />
                                <h2 className="text-lg font-semibold text-blue-500">Consultas Médicas</h2>
                                <div className="absolute top-0 right-0 w-12 h-full bg-blue-600 rounded-r-lg transition-colors duration-300 group-hover:bg-red-400"></div>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="lg:w-2/3 space-y-4">
                <p>Si deseas conocer los valores de nuestros servicios, visita la <b className="cursor-pointer underline text-blue-500">página de aranceles.</b></p>
                <p>Para conocer más información sobre nuestros centros médicos y sus horarios, accede a la <b className="cursor-pointer underline text-blue-500">página de ubicaciones y horarios de atención.</b></p>
                <p>Si aún tienes dudas sobre la reserva de horas en IntegraMédica o necesitas asistencia, ingresa a nuestro portal <b className="cursor-pointer underline text-blue-500">contáctanos</b> o comunícate con nuestro call center al 600 636 6666.</p>
            </div>
        </div>
    )
}