import axiosClient from "@/utils/axios.client"
import { Dispatch } from "@reduxjs/toolkit";
import { startCreateAppointment } from "@/store/thunks/appointmentThunk";
import { customSwal } from "@/helpers/custom_swal";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface UpdateProps {
    rut: string | null;
    numberAppointment: number | null;
    status: string;
}

interface CreateProps {
    rut: string | null;
    dispatch: Dispatch;
    router: any;
    email:string;
    setNumberAppointmnent: (numberApoinment: number | null) => void;
    setIsCreateAppointment: (isCreateAppointment: boolean) => void;
}

interface CancelAppointmentProps {
    rut: string | null, 
    numberAppointment: number, 
    router: AppRouterInstance;
    email: string | null;
    date: string;
    time: string;
}

export const updateAppointment = async({rut, numberAppointment, status}: UpdateProps ) => {

    try {
        const response = await axiosClient.put('/apponitment-update', {
            rut,
            numberAppointment,
            status
        })

        return response.data;

    } catch (error:any) {
        console.log(error?.response?.data?.message)
    }

}

export const handleCancelAppointment = async ({ rut, numberAppointment, router, email, date, time }: CancelAppointmentProps) => {

    const updatedStatus = "disabled";

    try {
        
        await updateAppointment({
            rut,
            numberAppointment,
            status: updatedStatus
        })

        customSwal({
            title: "Cita cancelada con éxito",
            error: "success"
        })

        await axiosClient.post('https://medical-api-kz7o.onrender.com/api/send-email', {
            to: email,
            subject: 'Cita cancelada',
            text: `Su cita para el día ${date} - ${time} horas ha sido cancelada.`,
        });

        router.push('/');
    } catch (error:any) {
        console.log(error?.response?.data?.message);
    }
}

export const handleCreateAppointment = async({
    rut, 
    dispatch, 
    router, 
    setNumberAppointmnent, 
    setIsCreateAppointment, 
    email
}: CreateProps) => {
    
    setIsCreateAppointment(true)
    const result = await dispatch<any>(startCreateAppointment({rut, setNumberAppointmnent}));
    
    if (result) {  
        const formattedNumberAppointment = Number(result);
        router.push(`/medical_consultation/successful_reservation/${formattedNumberAppointment}`)
        sessionStorage.setItem('email', email)
    } else {
        customSwal({
            title: 'No fue posible agendar la cita, intente nuevamente.',
            error: 'error'
        })
        setIsCreateAppointment(false)
    }
};