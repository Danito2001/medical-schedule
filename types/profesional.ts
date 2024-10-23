export interface Doctor {
    id: number;
    name: string;
    lastName: string;
    specialty: Specialty;
    center: Center;
    DoctorAvailability: DoctorAvailability;
}

interface Specialty {
    id: number;
    name: string;
}
  
interface Center {
    id: number;
    commune: string;
}
  
interface DoctorAvailability {
    id: number;
    startDateTime: string;
    endDateTime: string;
    days: string[];
    isAvailable: boolean;
    doctorId: number;
    patientId: number | null;
}
  
  