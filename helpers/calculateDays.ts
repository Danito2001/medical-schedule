import { useCallback } from "react";

export const days = [
    { day: "Lunes", value: 'monday' },
    { day: "Martes", value: 'tuesday' },
    { day: "Miercoles", value: 'wednesday' },
    { day: "Jueves", value: 'thursday' },
    { day: "Viernes", value: 'friday' },
    { day: "Sabado", value: 'saturday' },
    { day: "Domingo", value: 'sunday' },
]

export function useCalculateDaysUntilAppointment() {
    const calculateDaysUntilAppointment = useCallback((appointmentDate: Date) => {
        const today = new Date();
        const appointment = new Date(appointmentDate);

        const diffInMs = Number(appointment) - Number(today);

        const msPerDay = 1000 * 60 * 60 * 24;
        const daysRemaining = Math.ceil(diffInMs / msPerDay);

        return daysRemaining <= 0 ? "Hoy" : daysRemaining;
    }, []);

    return calculateDaysUntilAppointment;
}
