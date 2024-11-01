import { formattedTime } from "./formattedItems";

export const generateTimeSlots = (startTime: string, endTime: string, interval: number, date: Date) => {
    
    const slots: string[] = [];

    const today = new Date();
    today.setMinutes(today.getMinutes() + 10)

    const time = formattedTime(today)

    // Convierte tiempo en formato hh:mmam/pm a minutos desde medianoche
    const timeToMinutes = (time: string): number => {

        const [ timeStr, period ] = time.split(/(am|pm)/);
        const [ hoursStr, minutesStr ] = timeStr.split(':');
        let hours = parseInt(hoursStr, 10);
        const minutes = parseInt(minutesStr, 10);

        if (period === 'pm' && hours !== 12) {
            hours += 12;
        } else if (period === 'am' && hours === 12) {
            hours = 0;
        }

        return hours * 60 + minutes;
    };

    // Convierte minutos desde medianoche a formato hh:mmam/pm
    const minutesToTime = (minutes: number): string => {
        const hours24 = Math.floor(minutes / 60);
        const mins = minutes % 60;
        const period = hours24 >= 12 ? 'pm' : 'am';
        const hours12 = hours24 % 12 || 12; // Ajusta a formato de 12 horas

        return `${String(hours12).padStart(2, '0')}:${String(mins).padStart(2, '0')}${period}`;
    };

    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);
    
    let currentMinutes = startMinutes;

    while (currentMinutes <= endMinutes) {
        const formattedTime = minutesToTime(currentMinutes);
        slots.push(formattedTime);
      
        currentMinutes += interval; // Incrementa en el intervalo especificado
    }

    
    const validationTime = () => {
        const futureDate = date.toISOString().split('T')[0];
        const currentDate = today.toISOString().split('T')[0];

        const formattedCurrentTime = timeToMinutes(time);        

        if (currentDate < futureDate) {
            return slots;
        } else if (currentDate === futureDate) {
            return slots.filter((slot) => timeToMinutes(slot) > formattedCurrentTime);
        } else {
            return [];
        }
    };

    const filteredTime = validationTime()

    return filteredTime;
}