import { formattedTime } from "./formattedItems";

export const generateTimeSlots = (startTime: string, endTime: string, interval: number, date: Date) => {
    
    const slots: string[] = [];

    const today = new Date();
    today.setMinutes(today.getMinutes() + 10)

    const time = formattedTime(today)

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

    const timeToMinutes24 = (time: string): number => {
        const [ hourPart, minutePart ] = time.split(':');
        let [ hours, minutes ] = [parseInt(hourPart), parseInt(minutePart.slice(0, 2))];
        const period = minutePart.slice(-2).toLowerCase(); // am o pm
    
        if (period === 'pm' && hours !== 12) {
            hours += 12;
        } else if (period === 'am' && hours === 12) {
            hours = 0;
        }
    
        return hours * 60 + minutes;
    };

    const minutesToTime = (minutes: number): string => {
        const hours24 = Math.floor(minutes / 60);
        const mins = minutes % 60;
        const period = hours24 >= 12 ? 'pm' : 'am';
        const hours12 = hours24 % 12 || 12; 

        return `${String(hours12).padStart(2, '0')}:${String(mins).padStart(2, '0')}${period}`;
    };

    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);
    
    let currentMinutes = startMinutes;

    while (currentMinutes <= endMinutes) {
        const formattedTime = minutesToTime(currentMinutes);
        slots.push(formattedTime);
      
        currentMinutes += interval; 
    }

    
    const validationTime = () => {
        const currentDate = today.toLocaleDateString('en-CA');
        const selectedDate = date.toLocaleDateString('en-CA');
        
        const currentTime = formattedTime(today);

        const formattedCurrentTime = timeToMinutes24(currentTime);
        const slotsToMinutes = slots.map(slot => timeToMinutes24(slot));
            
        if ( currentDate < selectedDate ) {
            return slots;

        } else if (currentDate === selectedDate) {

            return slotsToMinutes
                .filter(slot => (
                    slot > formattedCurrentTime
                )).map(minutesToTime);

        } else {
            return [];
        }
    };

    const filteredTime = validationTime()
 
    return filteredTime;
}