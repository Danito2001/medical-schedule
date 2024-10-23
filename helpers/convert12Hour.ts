

export const convertTo12HourFormat = (timeString: string) => {

    const [hours, minutes] = timeString.split(':').map(Number);
    
    const period = hours >= 12 ? 'PM' : 'AM';
    
    const formattedHours = hours % 12 || 12; // Si hours es 0, se convierte a 12
    
    return `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;
}
