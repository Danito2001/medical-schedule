'use client';

import { useEffect, useState } from "react";
import { userContext } from "@/context/user.context";
import { useForm } from "@/hooks/useForm";
import { ModalTypes } from "@/types/modal";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";


export default function App({title, className, modalKey}: {title:string, modalKey:ModalTypes, className:string}) {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { setModalKey } = userContext();

    const [ isValid, setIsValid ] = useState({
        rut: false,
        numberAppointment: false
    })

    const { isLoading, formData, onChangeInput, errors, handleSubmitModal, setErrors, cleanFormData } = useForm({
        initialFields: {
            rut: '',
            numberAppointment: ''
        }
    })

    const { rut, numberAppointment } = formData;

    useEffect(() => {
        setIsValid({
            rut: !!errors.rut && rut.length === 0,
            numberAppointment: !!errors.numberAppointment && numberAppointment.length === 0
        });
    }, [errors, rut, numberAppointment]);
    
    useEffect(() => {
        if (isOpen) {
            setModalKey(modalKey)
            cleanFormData()
            setErrors({})
            setIsValid({ 
                rut: false,
                numberAppointment: false
            })
        }
    }, [isOpen])
    

    return (
        <>
            <Button
                className={`${className} border border-black rounded-lg`}
                onPress={onOpen}
            >
                {title}
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                            <div>
                                <form onSubmit={handleSubmitModal}>
                                    <ModalBody>
                                        <h3>{`Para ${modalKey} su orden, ingrese los datos.`}</h3>
                                        <Input
                                            type="text"
                                            label="Rut"
                                            placeholder="Ingrese su RUT"
                                            isInvalid={isValid.rut}
                                            name="rut"
                                            value={formData.rut}
                                            onChange={onChangeInput}
                                        />
                                        {isValid.rut && errors.rut && <span className="text-red-500">{errors.rut}</span>}

                                        <Input
                                            type="text"
                                            label="Numero de cita"
                                            placeholder="Ingrese numero de cita"
                                            isInvalid={isValid.numberAppointment}
                                            name="numberAppointment"
                                            value={formData.numberAppointment}
                                            onChange={onChangeInput}
                                        />
                                        {isValid.numberAppointment && errors.numberAppointment && <span className="text-red-500">{errors.numberAppointment}</span>}

                                    </ModalBody>
                                    <ModalFooter>
                                        <Button
                                            color="danger"
                                            variant="light"
                                            onPress={onClose}
                                        >
                                            Cerrar
                                        </Button>
                                            <Button
                                                disabled={isLoading}
                                                color="primary"
                                                type="submit"
                                            >
                                                {!isLoading ? 'Aceptar' : 'Cargando...'}
                                            </Button>
                                    </ModalFooter>
                                </form>
                            </div>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
