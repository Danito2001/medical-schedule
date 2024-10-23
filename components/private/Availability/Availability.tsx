import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import classNames from "classnames";
import TablePatient from "@/components/Table/Table";
import { SelectComponent } from "@/components/common/Select";
import { useAvailability } from "@/hooks/useAvailability";
import { CheckboxComponent } from "@/components/common/Checkbox";
import { userContext } from "@/context/user.context";
import { days } from "@/helpers/calculateDays";
import { userService } from "@/services/user";


export default function Availability() {

    const { createAvailability } = userService()

    const {
        submitForm,
        displayAvailability,
        setDisplayAvailability,
        handleChange,
        handleSelcted,
        cleanSelected,
        firstValue,
        time,
        error,
        refreshKey,
    } = useAvailability({createAvailability})

    const { user } = userContext()
    
    const [ isPatient, setIsPatient ] = useState<any>([])
    const [ filteredPatient, setFilteredPatient ] = useState<any>([])

    
    useEffect(() => {
        if (user && user.appointment && Array.isArray(user.appointment)) {
            const dataPatient = user.appointment.map(({ status, patient, numberAppointment, dateAndTime }) => {
                return { status, patient, numberAppointment, dateAndTime }
            })
            setIsPatient(dataPatient)
        }  else {
            setIsPatient([]);
        }
    }, [user])
    
    useEffect(() => {
        if (Array.isArray(isPatient)) {
            const patient = isPatient.filter(patient => patient.status === 'disabled')
            setFilteredPatient(patient)
        } else {
            setFilteredPatient([]);
        }
    }, [isPatient])
    
    const formattedDays = (daysEn: string[] = []) => {
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

    if (!user) return null;

    const availability = [user.DoctorAvailability]
    
    return (
        <div className="relative flex lg:overflow-hidden min-h-screen">
            <form onSubmit={submitForm} className={classNames(
                "absolute top-0 left-0 w-full pt-28 transition-all duration-300 ease-in-out",
                {
                    "-translate-x-full opacity-0 pointer-events-none": displayAvailability,
                    "translate-x-0 opacity-100 pointer-events-auto": !displayAvailability
                }
            )}>
                <div className="flex flex-col border border-gray-400 rounded-lg p-4">
                    <div
                        onClick={() => setDisplayAvailability(true)}
                        className="flex text-blue-500 justify-end cursor-pointer"
                    >
                        <h3 className="font-semibold underline pr-2">Mi disponibilidad y citas</h3>
                        <ChevronRightIcon width={20} />
                    </div>
                    <h2 className="text-center text-xl font-semibold text-blue-500 mb-4">Selecciona tu disponibilidad</h2>

                    <div className="flex flex-col lg:flex-row justify-center gap-20">
                        <div className="flex flex-col">
                            <div className="flex flex-col w-full border justify-center border-blue-500 rounded-lg p-6 h-[250px]">
                                <h3 className="mb-2 font-bold text-lg text-center">Días disponibles</h3>
                                {
                                    days.map((d, index) => (
                                        <CheckboxComponent
                                            key={index}
                                            refreshKey={refreshKey}
                                            handleChange={(e) => handleChange(e, d.value)}
                                            day={d.day} 
                                        />
                                    ))
                                }
                            </div>
                            {<span className="text-red-500">{error.selectedDays}</span>}
                        </div>

                        <div className="flex flex-col">
                            <div className="flex flex-col w-full border border-blue-500 rounded-lg p-6 h-[250px]">
                                <h3 className="mb-2 font-bold text-lg">Horas disponibles</h3>
                                <div className="space-y-4 p-2">
                                    <SelectComponent
                                        handleChange={handleSelcted}
                                        items={time}
                                        label="Hora inicio"
                                        firstValue={firstValue}
                                        selectId={1} 
                                        refreshKey={refreshKey}                                    
                                    />
                                    <SelectComponent
                                        handleChange={handleSelcted}
                                        items={time}
                                        label="Hora finalización"
                                        firstValue={firstValue}
                                        selectId={2}
                                        refreshKey={refreshKey}                                    
                                    />
                                </div>
                            </div>
                            {<span className="text-red-500 text-center">{error.arrayTime}</span>}
                        </div>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between px-20 pt-2">
                        <Button
                            onClick={cleanSelected}
                            className="bg-red-500 text-white"
                        >
                            Limpiar
                        </Button>
                        <Button
                            onClick={() => {
                                setTimeout(() => {
                                    cleanSelected();
                                }, 1000);
                            }}
                            type="submit"
                            className="bg-blue-500 text-white"
                        >
                            Guardar
                        </Button>
                    </div>
                </div>
            </form>

            <div className={classNames(
                "relative pt-10 space-y-6 w-full transition-all duration-300 ease-in-out",
                {
                    "translate-x-full opacity-0 pointer-events-none": !displayAvailability,
                    "translate-x-0 opacity-100 pointer-events-auto": displayAvailability
                }
            )}>
                <div className="flex flex-col justify-center w-full lg:w-1/2">
                    <div className="flex items-end justify-between">
                        <div>
                            <h2 className="font-semibold text-blue-500 text-2xl">Mi disponibilidad</h2>
                            <h4 className="opacity-85">Tu agenda semanal</h4>
                        </div>
                        <button
                            onClick={() => setDisplayAvailability(false)}
                            className="flex items-center underline text-blue-500 font-semibold"
                        >
                            <ChevronLeftIcon width={20} />
                            Regresar
                        </button>
                    </div>
                    <div className="border border-gray-400 rounded-lg p-6">
                        {   
                            availability.map(({ days, startDateTime, endDateTime }, index) => {
                                const daysInSpanish = formattedDays(days)
                                const availabilityInfo = daysInSpanish.map((day:string, index:number) => (
                                    <div key={index} className="flex justify-between">
                                        <span>{day}{index < days.length - 1 ? <br /> : ''}</span>
                                        <span>{startDateTime + ' - ' + endDateTime}</span>
                                    </div>
                                ))

                                return (
                                    <div key={index}
                                        >
                                        {availabilityInfo}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div>
                    <div>
                        <h2 className="font-bold text-blue-500 text-2xl">Historial de pacientes</h2>
                        <span className="opacity-85">Revise las citas y los detalles de sus pacientes.</span>
                        <TablePatient patients={filteredPatient} />
                    </div>
                </div>
            </div>
        </div>
    );
}
