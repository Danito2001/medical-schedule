import { formattedSpecialty } from "@/helpers/formattedItems";
import { generateTimeSlots } from "@/helpers/timeSlots";
import { useAppointment } from "@/hooks/useAppointment";
import { Doctor } from "@/types/profesional";
import { UserIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/react";

interface Slots {
    startDateTime: string; 
    endDateTime: string; 
    dateObject: Date;
    name: string;
    lastName: string;
    date: string;
    nameId: number;
}


const TimeSlots = ({ 
    startDateTime, 
    endDateTime, 
    dateObject,
    name,
    lastName,
    nameId,
    date
}: Slots) => {

    const { handleTimeAppointment } = useAppointment()
    
    const newTime: string[] = generateTimeSlots(startDateTime, endDateTime, 30, dateObject);

    return (
        <div className="flex overflow-x-auto space-x-2">
            {newTime.map((slot, slotIndex) => (
                <Button
                    key={slotIndex} // Unique key for each button
                    onClick={() => handleTimeAppointment({
                        nameId, 
                        startTime: startDateTime, 
                        endTime: endDateTime,
                        name, 
                        lastName,
                        date
                    })}
                    size="sm"
                >
                    {slot}
                </Button>
            ))}
        </div>
    );
};

export default function DoctorCard({ professionals, dateObject }: { professionals: Doctor[], dateObject: Date; }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {professionals.map((doc, index) => (
                <div key={index} className="border border-gray-300 rounded-lg p-2 space-y-2">
                    <div className="flex space-x-2">
                        <UserIcon width={24} />
                        <div className="flex flex-col">
                            <h3 className="text-xl font-semibold text-blue-500">{doc.name} {doc.lastName}</h3>
                            <span className="font-semibold">{formattedSpecialty(doc.specialty?.name)}</span>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span>Seleccione una hora:</span>
                        <div className="flex overflow-x-auto space-x-2">
                            {doc.DoctorAvailability ? (
                                <TimeSlots
                                    startDateTime={doc.DoctorAvailability.startDateTime}
                                    endDateTime={doc.DoctorAvailability.endDateTime}
                                    dateObject={dateObject}
                                    name={doc.name}
                                    lastName={doc.lastName}
                                    nameId={doc.id}
                                    date={dateObject.toISOString().split('T')[0]} 
                                />
                            ) : (
                                <span>No hay disponibilidad</span> 
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}