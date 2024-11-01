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
import DoctorCard from "@/components/common/DoctorCard/DoctorCard";


export default function Professionals() {

    const [ isOpen, setIsOpen ] = useState(false)
    const [ professionals, setProfessionals ] = useState<Doctor[]>([])
    const [ isDataLoading, setIsDataLoading ] = useState(false)
    const [ isCreateAppointment, setIsCreateAppointment ] = useState(false)


    const { centerId, specialtyId, date, day } = useSelector((state: RootState) => state.appointment);
    const { validateUserData, previsionId, rut } = validateData()

    const dateObject = new Date(date!);
    validateUserData()



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
                    <div className="flex flex-col px-4 lg:flex-row lg:space-x-10 lg:px-20 bg-white py-2 overflow-hidden rounded-lg animate__animated animate__fadeIn">
                        {
                            isDataLoading ? (
                                <div className="flex flex-col gap-2 md:flex-row">
                                    <SkeletonComponent />
                                    <SkeletonComponent />
                                </div>
                            ) : (previsionId || rut) ? (
                                professionals.length > 0 ? (
                                    <DoctorCard 
                                        professionals={professionals}
                                        dateObject={dateObject}
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
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    isCreateAppointment={isCreateAppointment}
                    setIsCreateAppointment={setIsCreateAppointment}
                />
            </div>
        </>
    )

}
