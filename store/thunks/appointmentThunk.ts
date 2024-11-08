import axiosClient from "@/utils/axios.client";
import { AppDispatch, RootState } from "../store"
import { setPrevisionAndEmail } from "../slices/appointmentSlice";

interface ValidationFields {
    rut: string;
    email: string;
    previsionId: number;
    setRut: (rut: string | null) => void;
}

interface CreateAppointmentProps {
    rut: string | null
    setNumberAppointmnent: (numberAppointment: number | null) => void;
}

export const startValidateRutPrevisionEmail = ({ rut, previsionId, email, setRut }: ValidationFields) => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await axiosClient.post('/validateRut', {
                rut,
                previsionId
            });
            
            const { rut: rutFromBackend, previsionId: previsionFromBackend } = response.data;
            dispatch(setPrevisionAndEmail({previsionId: previsionFromBackend, email}));
            setRut(rutFromBackend)
        } catch (error: any) {
            console.log(error?.response?.data?.message || error.message)
            throw error;
        }
    };
};

export const startCreateAppointment = ({ rut, setNumberAppointmnent }: CreateAppointmentProps) => {

    return async(dispatch: AppDispatch, getState: () => RootState) => {

        const { date, profesionalId, specialtyId, centerId } = getState().appointment;

        const formattedDate = new Date(date).toISOString()

        const appointment = {
	        date: formattedDate,
	        profesionalId: profesionalId,
	        centerId: centerId,
            rut: rut,
            specialtyId: specialtyId
        }

        try {
            const response = await axiosClient.post('/appointment', appointment);

            if (response) {

                const { numberAppointment } = response.data?.appointment
                setNumberAppointmnent(numberAppointment)
                return numberAppointment
            }
            

        } catch (error: any) {
            console.log(error?.response?.data?.message || error.message)
        }

    }
}