'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import axiosClient from "@/utils/axios.client";
import { Appointment } from "@/components/common/Appointment";
import { userContext } from "@/context/user.context";
import { useCalculateDaysUntilAppointment } from "@/helpers/calculateDays";
import { useAppointment } from "@/hooks/useAppointment";
import { updateAppointment } from "@/services/appointment.services";
import { customSwal } from "@/helpers/custom_swal";
import { convertTo12HourFormat } from "@/helpers/convert12Hour";
import { formattedCenter, formattedDate, formattedSpecialty } from "@/helpers/formattedItems";
import { SkeletonComponent } from "@/components/common/Skeleton";
import { AppointmentType } from "@/types/appointment";


export default function Detail({ params }: { params: { numberAppointment: number } }) {

    const [ appointment, setAppointment ] = useState<AppointmentType | null>(null);

    const appointmentParams = Number(params.numberAppointment);
    
    const { rut, modalKey } = userContext()

    const router = useRouter()

    const { status, cancelAppointment, confirmAppointment } = useAppointment()

    const calculateDaysUntilAppointment = useCalculateDaysUntilAppointment()

    useEffect(() => {

        const fetch = async () => {
            try {

                if (!rut || !appointmentParams) {
                    router.push('/')
                    customSwal({
                        title: "Rut o número de cita faltante",
                        error: "error"
                    })
                    return null;
                }
                
                const response = await axiosClient.post('/appointment-consultation', {
                    rut,
                    numberAppointment: appointmentParams
                });

                if (response.data.status === "active" && modalKey === 'confirmar') {
                    router.push('/')
                    customSwal({
                        title: "Ya confirmó su cita",
                        error: "error"
                    })
                    return null;
                }

                if (response.data.status === "disabled"){
                    router.push('/')
                    customSwal({
                        title: "No existe cita",
                        error: "error"
                    })
                    return null;
                }
                
                (response.data && response.data.numberAppointment === appointmentParams)
                ? setAppointment(response.data)
                : setAppointment(null);


            } catch (error:any) {
                console.log("Error fetching appointment", error);
                setAppointment(null);
                router.push('/')
                customSwal({
                    title: error?.response?.data?.message,
                    error: "error"
                })
            }
        };

        fetch();

    }, [appointmentParams, rut]); 

    useEffect(() => {
        
        const fetch = async() => {

            try {

                if (!appointment) return;

                const result = await updateAppointment({
                    rut,
                    numberAppointment,
                    status
                })

                const { status: statusAppointment, dateAndTime } = result;

                if (statusAppointment === 'disabled') {
                    router.push('/');
                } else {
                    router.push(`/appointment_detail/appointment_confirmed?dateAndTime=${encodeURIComponent(dateAndTime)}`);
                }

            } catch (error:any) {
                console.log(error?.response?.data?.message);
            }
        }
        fetch()
    }, [status])

    if (!appointment) {
        return <SkeletonComponent height="h-[400px]" width="w-[500px]"/>
    }

    const { 
        numberAppointment, 
        dateAndTime, 
        specialty:{ name:specialtyName }, 
        doctor: { name:doctorName, lastName },
        medicalCenter: { commune }
    } = appointment;

    const dateObject = new Date(dateAndTime);
    const date = formattedDate(dateObject)

    const hour = dateAndTime.split('T')[1]
    const cleanTimeString = hour.split('.')[0]
    const formattedHour = convertTo12HourFormat(cleanTimeString)

    const centerEs = formattedCenter(commune)
    const specialtyEs = formattedSpecialty(specialtyName)


    return (
        <Appointment
            numberAppointment={numberAppointment}
            date={date}
            time={formattedHour}
            doctor={doctorName + ' ' + lastName}  
            specialty={specialtyEs!}
            center_of_preference={centerEs!}  
            daysRemaining={calculateDaysUntilAppointment(new Date(dateAndTime))}
            confirmAppointment={confirmAppointment}
            cancelAppointment={cancelAppointment}
            modalKey={modalKey}
        />
    );
}
