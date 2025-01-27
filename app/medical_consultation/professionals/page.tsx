'use client'

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import axiosClient from "@/utils/axios.client";
import { BottomSheet } from "@/components/common/BottomSheet";
import { NotFoundComponent } from "@/components/common/NotFound";
import { SkeletonComponent } from "@/components/common/Skeleton";
import { validateData } from "@/store/actions/medicalActions";
import { RootState } from "@/store/store";
import { Doctor } from "@/types/profesional";
import { formattedDate } from "@/helpers/formattedItems";
import DoctorCard from "@/components/common/DoctorCard/DoctorCard";
import { usePathname } from "next/navigation";

interface TimeLengthData {
    length: number;
    nameId: number;
}

export default function Professionals() {

    const [ professionals, setProfessionals ] = useState<Doctor[]>([])
    const [ isDataLoading, setIsDataLoading ] = useState(false)
    const [ isCreateAppointment, setIsCreateAppointment ] = useState(false)

    const [ timeLength, setTimeLength ] = useState<TimeLengthData[]>([]);
    const [ timeLoading, setTimeLoading ] = useState(true)

    const { centerId, specialtyId, date, day } = useSelector((state: RootState) => state.appointment);
    const { validateUserData, previsionId, rut } = validateData()

    const dateObject = new Date(date!);
    validateUserData()

    const pathname = usePathname()

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

    const newDate = formattedDate(date)

    const availableProfessionals = timeLoading
        ? professionals
        : professionals.filter((doc) => {
            const timeForDoctor = timeLength.find((time) => time.nameId === doc.doctorAvailability?.doctorId);
            return timeForDoctor && timeForDoctor.length > 0;
    });


    return (
        <>
            <div className="bg-blue-500 min-h-screen">
                <div className="flex flex-col items-center justify-center py-16 space-y-2">
                    <h2 className="font-semibold text-2xl text-white px-2">{newDate}</h2>
                    <div className="flex flex-col px-4 lg:flex-row lg:space-x-10 lg:px-20 bg-white py-2 overflow-hidden rounded-lg animate__animated animate__fadeIn">
                        {
                            isDataLoading ? (
                                <div className="flex flex-col gap-2 md:flex-row">
                                    <SkeletonComponent />
                                    <SkeletonComponent />
                                </div>
                            ) : (previsionId || rut) ? (
                                availableProfessionals.length > 0 ? (
                                    <DoctorCard
                                        professionals={availableProfessionals}
                                        dateObject={dateObject}
                                        setTimeLength={setTimeLength}
                                        setTimeLoading={setTimeLoading}
                                    />
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
                    isCreateAppointment={isCreateAppointment}
                    setIsCreateAppointment={setIsCreateAppointment}
                />
            </div>
        </>
    )

}
