import axiosClient from "@/utils/axios.client"
import { Dispatch } from "@reduxjs/toolkit";
import { startCreateAppointment } from "@/store/thunks/appointmentThunk";
import { customSwal } from "@/helpers/custom_swal";

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

export const handleCancelAppointment = async (rut: string | null, numberAppointment: number, router: any) => {

    const updatedStatus = "disabled";

    try {
        
        customSwal({
            title: "Cita cancelada con éxito",
            error: "success"
        })

        await updateAppointment({
            rut,
            numberAppointment,
            status: updatedStatus
        })

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