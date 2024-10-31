'use client'

import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import axiosClient from "@/utils/axios.client";
import { BottomSheet } from "@/components/common/BottomSheet";
import { NotFoundComponent } from "@/components/common/NotFound";
import { SkeletonComponent } from "@/components/common/Skeleton";
import { validateData } from "@/store/actions/medicalActions";
import { setTimeAndProfesional, setDate } from "@/store/slices/appointmentSlice";
import { RootState } from "@/store/store";
import { Doctor } from "@/types/profesional";
import { generateTimeSlots } from "@/helpers/timeSlots";
import { UserIcon } from "@heroicons/react/24/outline";
import { formattedSpecialty } from "@/helpers/formattedItems";

interface HandleProps {
    nameId: number;
    startTime: string;
    endTime: string;
    name: string;
    lastName: string
}

export default function Professionals() {

    const dispatch = useDispatch()

    const [isOpen, setIsOpen] = useState(false)
    const [professionals, setProfessionals] = useState<Doctor[]>([])
    const [isDataLoading, setIsDataLoading] = useState(false)
    const [isCreateAppointment, setIsCreateAppointment] = useState(false)


    const { centerId, specialtyId, date, day } = useSelector((state: RootState) => state.appointment);
    const { validateUserData, previsionId, rut } = validateData()

    const availability = professionals.map(p => p.DoctorAvailability)
    const dateObject = new Date(date!);

    const today = new Date()

    validateUserData()

    const handleTimeAppointment = ({ nameId, startTime, name, lastName }: HandleProps) => {
        try {

            const fullName = name + ' ' + lastName
            dispatch(setTimeAndProfesional({ nameId, time: startTime, profesional: fullName }));

            const [selectionTime, period] = startTime.split(/(am|pm)/);

            setTimeout(() => {
                setIsOpen(true);
            }, 1000);

            const isoDate = new Date(date!).toISOString();
            const dateTime = isoDate.split('T')

            if (!dateTime) {
                throw new Error('Error obteniendo la fecha actual.');
            }

            const addedTimeDate = new Date(`${dateTime[0]} ${selectionTime} ${period.toUpperCase()}`);

            dispatch(setDate({ date: addedTimeDate.toISOString() }));
        } catch (error) {
            console.error('Error al manejar la cita:', error);
        }
    };



    useEffect(() => {
        const fetch = async () => {

            setIsDataLoading(true)

            try {
                const response = await axiosClient.get('/professionals', {
                    params: {
                        centerId: centerId,
                        specialtyId: specialtyId,
                        day: day
                    }
                })

                if (Array.isArray(response.data)) {
                    setProfessionals(response.data);
                    setIsDataLoading(false)
                } else {
                    console.error('Response data is not an array:', response.data);
                }

            } catch (error: any) {
                console.log(error?.response?.data?.message)
                setIsDataLoading(false)
            }
        }

        fetch()
    }, [])


    return (
        <>
            <div className="pt-4">
                <div className="flex items-center justify-center bg-blue-500 py-20">
                    <div className="flex flex-col px-4 lg:flex-row lg:space-x-10 lg:px-20 bg-white py-2 overflow-hidden rounded-lg">
                        {
                            isDataLoading ? (
                                <div className="flex flex-col gap-2 md:flex-row">
                                    <SkeletonComponent />
                                    <SkeletonComponent />
                                </div>
                            ) : (previsionId || rut) ? (
                                professionals.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {
                                            professionals.map((doc, index) => (
                                                <div key={index} className="border border-gray-300 rounded-lg p-2 space-y-2">
                                                    <div className="flex space-x-2">
                                                        <UserIcon width={24} />
                                                        <div className="flex flex-col">
                                                            <h3 className="text-xl font-semibold text-blue-500">{doc.name} {doc.lastName}</h3>
                                                            <span className="font-semibold">{formattedSpecialty(doc.specialty?.name)}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span>Seleccione una hora:</span>
                                                        <div className="flex overflow-x-auto space-x-2">
                                                            {availability.map(({ startDateTime, endDateTime }, index) => {
                                                                console.log({startTime: startDateTime})
                                                                console.log({endTime: endDateTime})
                                                                const timeSlots = generateTimeSlots(startDateTime, endDateTime, 30, dateObject);
                                                                console.log(timeSlots)
                                                                return (
                                                                    <div key={index} className="flex space-x-2">
                                                                        {timeSlots.map((slot, slotIndex) => (
                                                                            <Button
                                                                                key={slotIndex}
                                                                                size="sm"
                                                                                onClick={() => handleTimeAppointment({
                                                                                    nameId: doc.id,
                                                                                    startTime: slot,
                                                                                    endTime: endDateTime,
                                                                                    name: doc.name,
                                                                                    lastName: doc.lastName
                                                                                })}
                                                                            >
                                                                                {slot}
                                                                            </Button>
                                                                        ))}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                ) : (
                                    <div className="pb-32">
                                        <NotFoundComponent
                                            title="¡Lo sentimos!"
                                            firstText="No hay doctores disponibles."
                                            textButton="Buscar otra hora"
                                            image="not-found.png"
                                            width={200}
                                            height={200}
                                            href="/medical_consultation/patient_information"
                                        />
                                    </div>
                                )
                            ) : (
                                <div className="pb-32">
                                    <NotFoundComponent
                                        title="¡Lo sentimos!"
                                        firstText="No hay doctores disponibles."
                                        textButton="Buscar otra hora"
                                        image="not-found.png"
                                        width={200}
                                        height={200}
                                        href="/medical_consultation/patient_information"
                                    />
                                </div>
                            )
                        }
                    </div>

                </div>
            </div>
            <div className="relative overflow-hidden">
                <BottomSheet
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    isCreateAppointment={isCreateAppointment}
                    setIsCreateAppointment={setIsCreateAppointment}
                />
            </div>
        </>
    )

}
