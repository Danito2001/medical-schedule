import { formattedCenter, formattedSpecialty, formattedDate, formattedTime  } from "@/helpers/formattedItems";
import { AppointmentType } from "@/types/appointment";
import { BeakerIcon, BuildingOfficeIcon, CalendarIcon, UserIcon } from "@heroicons/react/24/outline"

interface PatientProps {
    appointment: AppointmentType;
    email: string | null;
}

export const PatientInformation = ({appointment, email}: PatientProps) => {

    const { 
        dateAndTime,
        medicalCenter: { commune },
        specialty: { name: specialtyName } 
    } = appointment;

    const { name, lastName, rut: rutPatient, prevision: { name: previsionName } } = appointment.patient;
    const { name: doctorName, lastName: doctorLastName } = appointment.doctor;

    const newDate = formattedDate(dateAndTime);

    const objectDate = new Date(dateAndTime)
    const time = formattedTime(objectDate)

    const specialtyEs = formattedSpecialty(specialtyName)
    const centerEs = formattedCenter(commune)

    return (
        <div className="bg-blue-500 text-white p-4 rounded-lg space-y-2">
            <div className="flex">
                <BuildingOfficeIcon width={24} />
                <div className="pl-2">
                    <h3 className="font-bold ">Centro Médico</h3>
                    <span>{centerEs}</span>
                </div>
            </div>

            <div className="my-auto border border-t-white opacity-60"></div>

            <div className="flex">
                <BeakerIcon width={24} />
                <div className="pl-2">
                    <h3 className="font-bold ">Especialidad:</h3>
                    <span>{specialtyEs}</span>
                </div>
            </div>

            <div className="my-auto border border-t-white opacity-60"></div>

            <div className="flex">
                <CalendarIcon width={24} />
                <div className="pl-2">
                    <h3 className="font-bold ">Fecha</h3>
                    <span>{newDate} - {time}</span>
                </div>
            </div>

            <div className="my-auto border border-t-white opacity-60"></div>

            <div className="flex">
                <CalendarIcon width={24} />
                <div className="pl-2">
                    <h3 className="font-bold">Profesional: {doctorName} {doctorLastName}</h3>
                </div>
            </div>

            <div className="my-auto border border-t-white opacity-60"></div>

            <div className="flex">
                <div className="flex flex-col">
                    <div className="flex space-x-2">
                        <UserIcon width={24} />
                        <div>
                            <h3 className="font-bold">Datos del paciente:</h3>
                            <span>Nombre y apellido: {name} {lastName}</span>
                        </div>
                    </div>
                    <div className="flex flex-col pl-8">
                        <span>Rut: {rutPatient}</span>
                        <span>Previsión: {previsionName}</span>
                        <span>Email: {email}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}