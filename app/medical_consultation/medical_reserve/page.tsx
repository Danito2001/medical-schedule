'use client'

import Link from "next/link";
import { Button } from "@nextui-org/react";
import { AutocompleteSpecialty } from "@/components/common/Autocomplete";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useAppointment } from "@/hooks/useAppointment";
import { useMedicalData } from "@/services/medicalService";
import { validateData } from "@/store/actions/medicalActions";
import { formattedArrayCenter, formattedArraySpecialty } from "@/helpers/formattedItems";

export default function MedicalReserve() {

    const { specialty, center, isLoading:isDataLoading } = useMedicalData();

    const {
        specialtySelected,
        locationSelected,
        handleSpecialty,
        handleLocation,
        handleLocationSubmit,
        isLoading
    } = useAppointment({
        specialtyItems: specialty,
        centerItems: center
    })

    const { validateUserData } = validateData()
    validateUserData()
    

    const specialtysEs = formattedArraySpecialty(specialty)
    const centerEs = formattedArrayCenter(center)

    return (
        <div className="pt-4">
            <div className="flex items-center justify-center bg-blue-500 py-20">
                <form
                    onSubmit={handleLocationSubmit}
                    className="p-8 bg-gray-100 space-y-6 rounded-lg"
                >
                    <div className="text-blue-500">
                        <h2 className="font-semibold">Consulta Médica</h2>
                        <span>¿Qué tipo de atención buscas y dónde quieres atenderte?</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-semibold">Especialidad</span>
                        <AutocompleteSpecialty
                            isLoading={isDataLoading}
                            handleSelectionChange={handleSpecialty}
                            items={specialtysEs}
                        />
                    </div>
                    <div>
                        <span className="font-semibold">Región, comuna o centro de preferencia</span>
                        <AutocompleteSpecialty
                            isLoading={isDataLoading}
                            handleSelectionChange={handleLocation}
                            items={centerEs}
                        />
                    </div>
                    <div className="flex justify-center">
                            <Button
                                disabled={(!specialtySelected || !locationSelected || isDataLoading || isLoading)}
                                type="submit"
                                className="bg-pink-600 text-white"
                                >
                                {!isLoading ? 'Buscar fecha en el calendario' : 'Cargando...'}
                            </Button>                       
                    </div>
                    <div className="flex text-blue-500 space-x-2">
                        <ArrowLeftIcon width={20} />
                        <Link className="underline" href={'/medical_appointment'}>Selecciona otro tipo de atención</Link>
                    </div>
                </form>
            </div>
        </div>
    )

}