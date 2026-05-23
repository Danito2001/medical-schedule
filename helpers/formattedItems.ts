import { days } from "./calculateDays";

export const formattedDate = (date:Date | null | string):string => {
    
    if (!date) return 'Fecha no disponible';

    const dateObj = typeof date === 'string' ? new Date(date) : date;

    return dateObj?.toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).replace(',', '')
}

export const formattedTime = (time: Date) => {

    return time.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
}

export const formattedDays = (daysEn: string[] = []) => {
    const orderedDays = [
        'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
    ];

    return orderedDays
        .filter(day => daysEn.includes(day))
        .map(day => {
            const matchedDay = days.find(d => d.value === day);
            return matchedDay ? matchedDay.day : day;
        });
};