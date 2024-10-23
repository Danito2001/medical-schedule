'use client'

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import axiosClient from "@/utils/axios.client";
import { CheckCircleIcon, HomeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { userContext } from "@/context/user.context";
import { handleCancelAppointment } from "@/services/appointment.services";
import { PatientInformation } from "@/components/common/PatientInformation/PatientInformation";
import { SkeletonComponent } from "@/components/common/Skeleton";
import { formattedDate, formattedTime } from "@/helpers/formattedItems";
import { useDispatch } from "react-redux";
import { setCleanData } from "@/store/slices/appointmentSlice";

export default function SuccessfulReservation({ params }: { params: { numberAppointment: number } }) {

    const router = useRouter()
    const appointmentNumber = Number(params.numberAppointment);
    
    const [ appointment, setAppointment ] = useState<any | null>(null)
    
    const { rut } = userContext()
    const dispatch = useDispatch()

    const email = sessionStorage.getItem('email');

    useEffect(() => {

        if (!rut) {
            router.push('/')
            return;
        }

    }, [])

    useEffect(() => {
        const fetch = async () => {
            try {

                if (!rut || !appointmentNumber) {
                    return null;
                }

                const response = await axiosClient.post('/appointment-consultation', {
                    rut,
                    numberAppointment: appointmentNumber
                });

                (response.data && response.data.numberAppointment === appointmentNumber)
                    ? setAppointment(response.data)
                    : setAppointment(null);

            } catch (error) {
                console.log("Error fetching appointment", error);
                setAppointment(null);
            }
        };

        fetch();

    }, [appointmentNumber, rut]);

    useEffect(() => {

        const sendEmail = async () => {
            try {
                if (!appointment) {
                    return null;
                }
                const dateAndTime = appointment.dateAndTime
                const stringDate = formattedDate(dateAndTime);

                const objectDate = new Date(dateAndTime)
                const time = formattedTime(objectDate)

                await axiosClient.post('http://localhost:3001/api/send-email', {
                    to: email,
                    subject: 'Cita agendada',
                    text: `Su cita ha sido agendada exitosamente para el día ${stringDate} - ${time} horas.`,
                });
                dispatch(setCleanData())
                sessionStorage.removeItem('email')
            } catch (error) {
                console.log('Error sending email', error);
            }
        };

        sendEmail();
    }, [appointment]);


    if (!appointment) {
        return <SkeletonComponent height="h-[400px]" width="w-[500px]"/>
    }

    const numberAppointment = appointment.numberAppointment;

    return (
        <div className="pt-4">
            <div className="flex flex-col items-center justify-center bg-blue-500 py-20">
                <div className="flex text-white pb-2">
                    <CheckCircleIcon width={30} />
                    <h2 className="font-semibold text-2xl pl-2">Hora reservada</h2>
                </div>
                <div className="bg-white px-36 py-2 space-y-4 rounded-lg">
                    <div className="space-y-2">
                        <div className="flex flex-col space-y-4">
                            <div className="flex flex-col text-center border border-gray-300 rounded-lg p-2 text-blue-500">
                                <span>Código de reserva</span>
                                <span className="text-xl">{numberAppointment}</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-blue-500 text-lg font-semibold">Detalle de tu hora</h3>
                            
                            <PatientInformation appointment={appointment} email={email} />

                            <div className="flex justify-between px-2">
                                <button
                                    onClick={() => router.push('/')}
                                    className="flex flex-col items-center border border-gray-500 rounded-lg p-2"
                                >
                                    <HomeIcon width={30} />
                                    Volver a inicio
                                </button>
                                <button
                                    onClick={() => handleCancelAppointment(rut, numberAppointment, router)}
                                    className="flex flex-col items-center border border-gray-500 rounded-lg p-2"
                                >
                                    <XMarkIcon width={30} />
                                    Anular hora
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
