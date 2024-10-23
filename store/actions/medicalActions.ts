import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import { RootState } from "../store"
import { setCleanData } from "../slices/appointmentSlice"
import { userContext } from "@/context/user.context"
import Swal from "sweetalert2"


export const validateData = () => {
    const { previsionId } = useSelector( (state:RootState) => state.appointment)
    const { rut } = userContext();
    const dispatch = useDispatch()
    const router = useRouter()

    const validateRutAndPrevision = () => {
        useEffect(() => {
            if (rut || previsionId) {
                dispatch(setCleanData())
            } 
        }, [])
    }

    const validateUserData = () => {
        useEffect(() => {
            if( !rut || !previsionId) {
                router.push('/medical_consultation/patient_information')
                Swal.fire({
                    title: 'Reingrese sus datos',
                    icon: 'error'
                })
            }
        }, [])
    }

    return {
        validateRutAndPrevision,
        validateUserData,
        previsionId,
        rut
    }

}