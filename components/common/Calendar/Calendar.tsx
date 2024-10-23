import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '@/styles/Custom_Calendar.css'

interface CalendarProps {
    startDate: Value;
    setStartDate: (date: Value) => void;
}

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const CalendarComponent: React.FC<CalendarProps> = ({ startDate, setStartDate }) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return <div className='text-center'>Espere, cargando...</div>;
    }

    const handleDate = (value: Value) => {
        setStartDate(value);
    };

    return (
        <div className="flex gap-x-4">
            <Calendar
                minDate={new Date()}
                value={startDate}
                onChange={handleDate}
            />
        </div>
    );
};

export default CalendarComponent;
