import { Key, useState } from "react"
import { useRouter } from "next/navigation";
import { userContext } from "@/context/user.context";
import { userService } from "@/services/user";
import { useAppDispatch } from "@/store/store";
import { startValidateRutPrevisionEmail } from "@/store/thunks/appointmentThunk";
import * as Yup from 'yup';

interface InitProps {
    initialFields: Record<string, any>;
    previsionKey?: Key | null
}

export const useForm = ({initialFields, previsionKey}: InitProps) => {

    const [ formData, setFormData ] = useState<Record<string, any>>(initialFields);
    const [ errors, setErrors ] = useState<Partial<Record<string, string>>>({});
    const [ statusError, setStatusError ] = useState<string | null>(null);

    const [ isLoading, setIsLoading ] = useState(false);

    const { setRut } = userContext()
    const { login } = userService()
    
    const dispatch = useAppDispatch()

    const router = useRouter()


    const generateSchema = (fields:Record<string, any>) => {

        const schemaShape:Record<string, any> = {}

        Object.keys(fields).forEach( (key) => {
            if (key === 'rut') {
                schemaShape[key] = Yup.string()
                .matches(/^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/, "El formato del RUT no es válido")
                .required("El RUT es obligatorio");

            } else if (key === 'numberAppointment') {
                schemaShape[key] = Yup.number()
                .typeError("Debe ingresar un número válido")
                .required("Debe ingresar numero de cita")

            } else if (key === 'email') {
                schemaShape[key] = Yup.string()
                .required("Debe ingresar un email")
                .min(8, 'Debe tener al menos 8 caracteres')
                .matches(/@/, 'Debe contener un arroba (@)')

            } else if (key === 'password') {
                schemaShape[key] = Yup.string()
                .required("La contraseña es obligatoria")
                .min(8, 'Debe tener al menos 8 caracteres')
            }
        })
        return Yup.object().shape(schemaShape)
    }

    const schema = generateSchema(initialFields);

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmitModal = async (e: React.FormEvent<HTMLFormElement>) => {      
        setIsLoading(true)  
        e.preventDefault()

        const { numberAppointment, rut } = formData;

        try {
            await schema.validate(formData, { abortEarly: false });
            setErrors({});
            setRut(rut)
                
            setIsLoading(false)
            router.push(`appointment_detail/${numberAppointment}`)
        } catch (validationErrors) {
            if (validationErrors instanceof Yup.ValidationError) {
                const newErrors: Record<string, string> = {}
                validationErrors.inner.forEach( (error) => {
                    newErrors[error.path!] = error.message;
                })
                setErrors(newErrors)
                setFormData(initialFields)
            }
        }
    };
    
    const handleSubmitPatient = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()
        setIsLoading(true)
        const { rut, email } = formData
        const previsionId = Number(previsionKey)
        
        try {            
            setErrors({})
            
            await schema.validate(formData, {abortEarly: false})

            await dispatch(startValidateRutPrevisionEmail({rut, previsionId, email, setRut}))
            setTimeout(() => {
                router.push('/medical_consultation/medical_reserve')
                setIsLoading(false)
            }, 1000);
        } catch (error:any) {

            const validationErrors: Record<string, string> = {}
            setIsLoading(false)

            if (error instanceof Yup.ValidationError) {

                error.inner.forEach(( err ) => {
                    if (err.path) {
                        validationErrors[err.path] = err.message
                    }
                })
                setErrors(validationErrors)
            } else if (error.response.data.message) {

                validationErrors['apiError'] = error.response.data.message
            }
            if (previsionId === 0) {
                setStatusError('Debes seleccionar una prevision')
            } 

            setErrors(validationErrors)
        }
    }

    const handleLoginForm = async (e: React.FormEvent<HTMLFormElement>) => {

        setIsLoading(true)
        e.preventDefault();
        const {email, password} = formData;

        try {

            await schema.validate(formData, {abortEarly: false})
            await login({email, password})
            setErrors({})
            setIsLoading(false)

        } catch (error:any) {

            if (error instanceof Yup.ValidationError) {
                const newErrors: Record<string, string> = {}
                error.inner.forEach( (err) => {
                    newErrors[err.path!] = err.message;
                })
                setErrors(newErrors)
                setFormData(initialFields)
            } else if (error.response) {
                setStatusError(error?.response?.data?.message)
            }

            setIsLoading(false)
        }
    }

    const cleanFormData = () => {setFormData(initialFields)}

    return {
        cleanFormData,
        formData,
        setErrors,
        errors,
        statusError,
        onChangeInput,
        handleSubmitModal,
        handleSubmitPatient,
        handleLoginForm,
        isLoading
    }
}