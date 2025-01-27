import { useEffect, useState } from "react";
import { Button, CircularProgress } from "@nextui-org/react";

import TablePatient from "@/components/Table/Table";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { userContext } from "@/context/user.context";
import { userService } from "@/services/user";
import { LoadingComponent } from "@/components/common/Loading";


export default function Patient() {

    const [ isPatient, setIsPatient ] = useState<any>([])
    const [ filteredPatient, setFilteredPatient ] = useState<any>([])

    const { user, isLoading, isDataLoading } = userContext()
    const { handleUpdatePatients } = userService()


    useEffect(() => {
        if (user && user.appointment && Array.isArray(user.appointment)) {
            const dataPatient = user?.appointment.map(({ id, status, patient, numberAppointment, dateAndTime }) => {
                return { id, status, patient, numberAppointment, dateAndTime }
            })
            setIsPatient(dataPatient)
        } else {
            setIsPatient([]);
        }
    }, [user])

    useEffect(() => {
        if (Array.isArray(isPatient)) {
            const patient = isPatient.filter(patient => patient.status !== 'disabled')
            setFilteredPatient(patient)
        } else {
            setFilteredPatient([]);
        }
    }, [isPatient])


    return (
        <div>
            {isLoading ? (
                <LoadingComponent />
            ) : (
                <div className="pt-20">
                    <div className="space-y-4">
                        <div className="flex items-end justify-between">
                            <div>
                                <h2 className="font-semibold text-blue-500 text-2xl">Mis citas</h2>
                                <span className="opacity-85">Ve a detalles tus citas actuales</span>
                            </div>
                            <Button onClick={handleUpdatePatients} className="bg-blue-500 text-white">
                                {!isDataLoading ? <ArrowPathIcon width={24} /> : <CircularProgress size="sm" />}
                            </Button>
                        </div>
                        <TablePatient isLoading={isDataLoading} patients={filteredPatient} />
                    </div>
                </div>
            )}
        </div>

    );
}