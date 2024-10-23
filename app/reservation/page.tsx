import Link from "next/link";
import { Button } from "@nextui-org/react";
import { ModalAppointment } from "@/components/common/Modal";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";

export default function Reservation() {

    return (
        <div className="flex flex-col items-center pt-20 space-y-6">
            <h2 className="text-blue-600 font-bold text-2xl">Si ya tienes una hora agendada</h2>
            <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-6 pb-10"> 
                <div className="flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0">
                    <div className="flex flex-col bg-blue-400 p-4 rounded-lg items-center">
                        <CheckCircleIcon width={50}/>
                        <span className="opacity-85 text-xl">Confirma tu próxima cita.</span>
                        <ModalAppointment 
                            modalKey="confirmar" 
                            className="bg-white" 
                            title="Confirmar"
                        />
                    </div>
                    <div className="flex flex-col bg-blue-300 p-4 rounded-lg items-center">
                        <XMarkIcon width={50}/>
                        <span className="opacity-85 text-xl">Cancela tu cita existente.</span>
                        <ModalAppointment 
                            modalKey="cancelar"
                            className="bg-gray-100" 
                            title="Cancelar"
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-4 border border-gray-400 p-4 rounded-lg">
                <div>
                    <h4 className="text-2xl mb-2">¿No tienes cita médica? Agenda aquí</h4> 
                    <span>Agende una cita con nuestros profesionales</span>
                </div>
                <Link href='/medical_appointment'>
                    <Button className="bg-blue-500 rounded-lg mt-2 text-white">Agendar cita</Button> 
                </Link>
            </div>
        </div>
    )
}
