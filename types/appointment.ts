export interface AppointmentType {
  id: number;
  numberAppointment: number;
  dateAndTime: string;
  status: string;
  medicalCenterId: number;
  specialtyId: number;
  doctorId: number;
  patientRut: string;
  specialty: Specialty;
  medicalCenter: MedicalCenter;
  patient: Patient;
  doctor: Doctor;
}

interface Doctor {
  name: string;
  lastName: string;
}

interface Patient {
  id: number;
  rut: string;
  name: string;
  lastName: string;
  previsionId: number;
  prevision: Specialty;
}

interface MedicalCenter {
  id: number;
  commune: string;
}

interface Specialty {
  id: number;
  name: string;
}