import { formattedSpecialty } from "@/helpers/formattedItems";
import { generateTimeSlots } from "@/helpers/timeSlots";
import { useAppointment } from "@/hooks/useAppointment";
import { Doctor } from "@/types/profesional";
import { UserIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/react";
import { useEffect } from "react";

interface TimeLengthData {
    length: number;
    nameId: number;
}

interface Slots {
    startDateTime: string; 
    endDateTime: string; 
    dateObject: Date;
    name: string;
    lastName: string;
    date: string;
    nameId: number;
    onNewTimeLength: (data: TimeLengthData) => void;
}


const TimeSlots = ({ 
    startDateTime, 
    endDateTime, 
    dateObject,
    name,
    lastName,
    nameId,
    date,
    onNewTimeLength
}: Slots) => {

    const { handleTimeAppointment } = useAppointment()
    const generatedSlots = generateTimeSlots(startDateTime, endDateTime, 30, dateObject);

    useEffect(() => {
        if (onNewTimeLength) {
            onNewTimeLength({
                nameId,
                length: generatedSlots.length,
            })
        }
    }, []);
    

    return (
        <div className="flex overflow-x-auto space-x-2">
            {generatedSlots.map((slot, slotIndex) => {

                return (
                    <Button
                        className="text-white bg-blue-500"
                        key={slotIndex}
                        onClick={() => handleTimeAppointment({
                            nameId, 
                            startTime: slot, 
                            endTime: endDateTime,
                            name, 
                            lastName,
                            date
                        })}
                        size="sm"
                    >
                        {slot}
                    </Button>
                )
            }
            )}
        </div>
    );
};

export default function DoctorCard({ 
    professionals, 
    dateObject,
    setTimeLength,
    setTimeLoading
}: { 
    professionals: Doctor[], 
    dateObject: Date;
    setTimeLength: React.Dispatch<React.SetStateAction<TimeLengthData[]>>;
    setTimeLoading: (timeLoading: boolean) => void;
 }) {

    const handleTimeLength = ({ length, nameId }: TimeLengthData) => {
        const newData: TimeLengthData = { length, nameId };
        setTimeLength((prevState) => [...prevState, newData]);
        setTimeLoading(false);
    };
    

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {professionals.map((doc, index) => (
                <div key={index} className="border border-gray-400 rounded-lg p-2 space-y-2 min-w-[300px] bg-gray-100">
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
                                    onNewTimeLength={handleTimeLength}
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