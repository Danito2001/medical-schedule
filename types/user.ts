export interface UserT {
  id: number;
  name: string;
  lastName: string;
  email: string;
  appointment: Appointment[];
  doctorAvailability: DoctorAvailability;
}

interface DoctorAvailability {
  startDateTime: string;
  endDateTime: string;
  days: string[];
  isAvailable: boolean;
  doctorId: number;
  patientId: null;
}

interface Appointment {
  id: number;
  numberAppointment: number;
  dateAndTime: string;
  status: string;
  medicalCenterId: number;
  specialtyId: number;
  doctorId: number;
  patientRut: string;
  patient: Patient;
}

interface Patient {
  id: number;
  rut: string;
  name: string;
  lastName: string;
  email: string;
  previsionId: number;
}
