'use client'

import { Button, Input } from "@nextui-org/react";
import { useForm } from "@/hooks/useForm";
import { AutocompleteSpecialty } from "@/components/common/Autocomplete";
import { useAppointment } from "@/hooks/useAppointment";
import { useMedicalData } from "@/services/medicalService";
import { validateData } from "@/store/actions/medicalActions";

export default function PatientInformation() {
    

    const { previsionKey, handlePrevision } = useAppointment();
    const { prevision, isLoading:isDataLoading } = useMedicalData();
    
    
    const { errors, formData, onChangeInput, handleSubmitPatient, statusError, isLoading } = useForm({
        initialFields: { rut: '', email: '' },
        previsionKey
    })

    const { validateRutAndPrevision } = validateData();
    validateRutAndPrevision()

    return (
        <div className="pt-4">
            <div className="flex items-center justify-center bg-blue-500 py-20">
                <form 
                    onSubmit={handleSubmitPatient}
                    className="bg-white px-20 py-2 space-y-10 rounded-lg"
                >
                    <div className="text-blue-500">
                        <h2 className="font-semibold text-xl">Datos del paciente</h2>
                        <span>Ingresa los datos del paciente para reservar la hora</span>
                    </div>
                    <div className="space-y-6">
                        <div className="flex flex-col">
                            <Input
                                label="Rut"
                                labelPlacement="outside"
                                placeholder="Ingresa RUT del paciente"
                                name="rut"
                                value={formData.rut}
                                onChange={onChangeInput}
                            />
                            <span className="opacity-70">*Ej: 12.345.678-5</span>
                            { errors && <span className="text-red-500">{errors.rut}</span>}
                        </div>
                        <div>
                            <AutocompleteSpecialty 
                                isLoading={isDataLoading}
                                label="Previsión"
                                items={prevision}
                                handleSelectionChange={handlePrevision}
                            />
                            {statusError && <span className="text-red-500">{statusError}</span>}
                        </div>
                        <div className="flex flex-col pt-2">
                            <Input
                                label="Correo"
                                labelPlacement="outside"
                                placeholder="Ingresa correo"
                                name="email"
                                value={formData.email}
                                onChange={onChangeInput}
                            />
                            { errors && <span className="text-red-500">{errors.email}</span>}
                            <span className="opacity-80">Este correo será utilizado para enviar información de la hora medica.</span>
                            { errors && <span className="text-red-500">{errors.error}</span>}
                        </div>
                    </div>
                    <div>
                        <div className="flex text-blue-500 space-x-2 pb-2">
                            <span>Al continuar usted acepta y confirma haber entendido <br />nuestra <b className="cursor-pointer underline">política de privacidad.</b></span>
                        </div>
                        <div className="flex flex-col justify-center">
                            <Button
                                disabled={isLoading || isDataLoading}
                                type="submit"
                                className="bg-pink-600 text-white"
                            >
                                { !isLoading ? 'Aceptar' : 'Cargando...'}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )

}
