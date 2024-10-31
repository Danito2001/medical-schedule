import { Dispatch, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { BeakerIcon, BuildingOfficeIcon, CalendarIcon, UserIcon } from "@heroicons/react/24/solid";

import { userContext } from "@/context/user.context";
import { RootState } from "@/store/store";
import { formattedCenter, formattedDate, formattedSpecialty } from "@/helpers/formattedItems";
import { handleCreateAppointment } from "@/services/appointment.services";

interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    isCreateAppointment: boolean;
    setIsCreateAppointment: (isCreateAppointment: boolean) => void;
}

export default function BottomSheet({ isOpen, setIsOpen, isCreateAppointment, setIsCreateAppointment }: Props) {

    const dispatch = useDispatch()
    const router = useRouter()

    const { rut, setNumberAppointmnent } = userContext()
    const { date, time, center, specialty, email, profesional } = useSelector( (state:RootState) => state.appointment)

    const newDate = formattedDate(date)
    const centerEs = formattedCenter(center)
    const specialtyEs = formattedSpecialty(specialty)

    return (
        <nav 
            className={`${isOpen ? 'translate-y-0' : 'translate-y-full'} shadow-xl fixed inset-0 flex items-end justify-center  bg-opacity-50 z-10 h-screen transition-transform duration-300`}
        >
            <div className="bg-blue-500 rounded-t-lg w-full sm:w-1/2 p-4">

                {/* Content */}
                <div className="space-y-4">
                    <div>
                        <h3 className="text-white font-semibold text-2xl">Resumen de tu hora</h3>
                        <div className="my-auto border-t border-white"></div>
                    </div>

                    <div className="flex text-white pb-1">
                        <UserIcon width={30} />
                        <span className="text-lg pl-2">{profesional}</span>
                    </div>
                    <div className="my-auto border-t border-white"></div>

                    <div className="flex text-white pb-1">
                        <BeakerIcon width={30} />
                        <span className="text-lg pl-2">{specialtyEs}</span>
                    </div>
                    <div className="my-auto border-t border-white"></div>

                    <div className="flex text-white pb-1">
                        <CalendarIcon width={30} />
                        <span className="text-lg pl-1">{newDate}, {time}</span>
                    </div>
                    <div className="my-auto border-t border-white"></div>

                    <div className="flex text-white pb-4">
                        <BuildingOfficeIcon width={30} />
                        <span className="text-lg bg-pink-500 pl-1 rounded-lg">AgendaMed - {centerEs}</span>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col space-y-4">
                    <Button 
                        disabled={isCreateAppointment}
                        onClick={() => handleCreateAppointment({
                            rut, 
                            setNumberAppointmnent, 
                            router, 
                            dispatch, 
                            setIsCreateAppointment,
                            email
                        })}
                        size="lg" 
                        className="bg-pink-500 text-white"
                    >
                        { (!isCreateAppointment) ? 'Agendar' : 'Cargando...'}
                    </Button>
                    <Button 
                        disabled={isCreateAppointment}
                        onClick={() => setIsOpen(false)}
                        size="lg" 
                        className="bg-gray-300 text-black"
                    >
                        Volver a buscar
                    </Button>
                </div>
            </div>
        </nav>
    );
}
