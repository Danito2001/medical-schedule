import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { formattedDate } from "@/helpers/formattedItems";


export default function AppointmentConfirmed({date}: {date: string | null}) {

    const newDate = formattedDate(date)
    const router = useRouter()

    return (
        <div className="flex items-center justify-center">
            <div className="flex flex-col space-y-4 border border-gray-400 rounded-lg p-8">
                <div className="flex flex-col items-center">
                    <CheckCircleIcon className="text-green-500" width={80}/>
                    <h2 className="text-3xl font-semibold text-blue-500">Cita confirmada</h2>
                    <span>Su cita es para el dia {newDate}</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                    <span className="text-xl">¡Felicidades! Su cita ha sido confirmada exitosamente.</span>
                    <Button
                        onClick={() => router.push('/')} 
                        className="bg-blue-500 text-white"
                    >
                        Regresar al inicio
                    </Button>
                </div>
            </div>
        </div>
    )
}
