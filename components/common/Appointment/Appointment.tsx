import { ModalTypes } from "@/types/modal";
import { Button } from "@nextui-org/react";
import {
    BeakerIcon,
    CalendarIcon,
    ClockIcon,
    MapPinIcon,
    UserIcon,
    XMarkIcon
} from "@heroicons/react/24/solid";
import classNames from "classnames";

interface AppointmentProps {
    numberAppointment: number;
    date: string;
    time: string;
    doctor: string;
    specialty: string;
    center_of_preference: string;
    daysRemaining?: number | string;
    confirmAppointment: () => void;
    cancelAppointment: () => void;
    modalKey: ModalTypes | null;
}

export default function Appointment({
    date,
    time,
    doctor,
    specialty,
    daysRemaining,
    numberAppointment,
    center_of_preference,
    confirmAppointment,
    cancelAppointment,
    modalKey
}: AppointmentProps) {

    const daysUntilAppointment = typeof daysRemaining === 'number' && daysRemaining >= 1
        ? `Su cita es en ${daysRemaining} dias`
        : `Su cita es ${daysRemaining}` 

    return (
        <div className="flex flex-col items-center justify-center pt-4">
            <h1 className="text-blue-500 font-bold text-2xl pb-2">
                {modalKey === 'confirmar' ? 'Confirme su cita' : 'Cancele su cita'}
            </h1>
            <div className="flex flex-col space-y-4 border border-gray-300 bg-gray-100 rounded-lg p-4">
                <div className="flex flex-col items-center border border-gray-300 rounded-lg text-blue-500">
                    <span>Código de reserva:</span>
                    <span className="font-semibold text-lg">{numberAppointment}</span>
                </div>
                <div className="flex justify-between px-2 space-x-2">
                    <div className="flex flex-col space-y-4">
                        <div className="flex space-x-2">
                            <CalendarIcon className="opacity-75" width={20} />
                            <div>
                                <h4 className="font-semibold text-lg">Fecha</h4>
                                <span>{date}</span>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <ClockIcon className="opacity-75" width={20} />
                            <div>
                                <h4 className="font-semibold text-lg">Hora</h4>
                                <span>{time}</span>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <UserIcon className="opacity-75" width={20} />
                            <div>
                                <h4 className="font-semibold text-lg">Doctor</h4>
                                <span>{doctor}</span>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <BeakerIcon className="opacity-75" width={20} />
                            <div>
                                <h4 className="font-semibold text-lg">Especialidad</h4>
                                <span>{specialty}</span>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <MapPinIcon className="opacity-75" width={20} />
                            <div>
                                <h4 className="font-semibold text-lg">Dirección</h4>
                                <span>{`MedAgenda - ${center_of_preference}`}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={classNames("flex gap-2 text-white text-center",{
                            "justify-end": (modalKey === "cancelar"),
                            "flex-col md:flex-row": (modalKey === "confirmar")
                        })}>
                            
                            <span className="bg-blue-500 p-1 rounded-lg">{daysUntilAppointment}</span>
                            <span className={`${modalKey === 'confirmar' && 'bg-red-500 p-1 rounded-lg'}`}>
                                {modalKey === "confirmar" && 'Confirme ahora'}
                            </span>
                        </div>
                        <div className="flex flex-col mx-auto pt-24 w-[150px] sm:w-[200px] lg:w-[250px]">
                            {modalKey === 'confirmar' && (
                                <>
                                    <Button
                                        className="bg-blue-500 text-white"
                                        onClick={() => confirmAppointment()}
                                    >
                                        Confirmar asistencia
                                    </Button>
                                    <span className="text-xs lg:text-sm text-center opacity-90">
                                        Al hacer clic en Confirmar asistencia, confirma su asistencia a esta cita.
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center bg-gray-300 p-4 rounded-lg">
                    <div className="flex items-center text-red-500">
                        <XMarkIcon width={20} />
                        <span>Cita no confirmada</span>
                    </div>
                    <div className="flex flex-col lg:flex-row space-y-2 lg:space-x-2 lg:space-y-0 items-center">
                        {modalKey === "cancelar" ? (
                            <Button 
                                className="w-full bg-red-500 text-white"
                                onClick={cancelAppointment}
                            >
                                Cancelar cita
                            </Button>
                        ) : null
                    }
                    </div>

                </div>
            </div>
        </div>
    )
}