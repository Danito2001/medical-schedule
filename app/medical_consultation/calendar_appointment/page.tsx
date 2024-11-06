'use client'

import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { CalendarComponent } from "@/components/common/Calendar";
import { useAppointment } from "@/hooks/useAppointment";
import { validateData } from "@/store/actions/medicalActions";

export default function MedicalCalendar() {

    const daysOfWeek: Record<string, string> = {
        Sun: 'Domingo',
        Mon: 'Lunes',
        Tue: 'Martes',
        Wed: 'Miércoles',
        Thu: 'Jueves',
        Fri: 'Viernes',
        Sat: 'Sábado'
    };

    const monthsOfYear: Record<string, string> = {
        Jan: 'Enero',
        Feb: 'Febrero',
        Mar: 'Marzo',
        Apr: 'Abril',
        May: 'Mayo',
        Jun: 'Junio',
        Jul: 'Julio',
        Aug: 'Agosto',
        Sep: 'Septiembre',
        Oct: 'Octubre',
        Nov: 'Noviembre',
        Dec: 'Diciembre'
    };

    const { startDate, setStartDate, isLoading, handleCalendarSubmit, dateArray } = useAppointment()
    const router = useRouter()

    const { validateUserData } = validateData()
    validateUserData()

    
    const getDayInEs = () => {
        const day: string = dateArray[0];
        const month: string = dateArray[1];
        const dayOfMonth: string = dateArray[2];
        const year: string = dateArray[3];

        const findKey = (key: string, obj: Record<string, string>) => {
            return Object.keys(obj).find(k => key === k)
        }

        const dayInSpanish = findKey(day, daysOfWeek) ? daysOfWeek[day] : undefined;
        const monthInSpanish = findKey(month, monthsOfYear) ? monthsOfYear[month] : undefined;

        return !startDate
            ? ''
            : (
                <span>
                    Mostrar horas para el <b className="text-blue-500">
                        {dayInSpanish}, {dayOfMonth} de {monthInSpanish} {year}
                    </b>
                </span>
            );
    }
    const selectedDay = getDayInEs()


    return (
        <div className="pt-4">
            <div className="flex items-center justify-center bg-blue-500 py-20">
                <div className="flex flex-col items-center bg-white px-12 py-2 space-y-2 w-[500px] animate__animated animate__fadeIn">
                    <h2 className="font-semibold text-xl text-blue-500">Seleccione una fecha</h2>
                    <CalendarComponent
                        startDate={startDate instanceof Date ? startDate : null}
                        setStartDate={setStartDate}
                    />
                    <div className="flex flex-col justify-center space-y-2">
                        <span>{selectedDay}</span>
                        <Button
                            disabled={!startDate || isLoading}
                            onClick={handleCalendarSubmit}
                            type="submit"
                            className="bg-pink-600 text-white"
                        >
                            {
                                !isLoading ? 'Buscar hora' : 'Cargando...'
                            }
                        </Button>
                    </div>
                    <div className="flex text-blue-500 space-x-2">
                        <ArrowLeftIcon width={20} />
                        <button className="underline" onClick={() => router.back()}>Cerrar calendario</button>
                    </div>
                </div>
            </div>
        </div>
    )

}
