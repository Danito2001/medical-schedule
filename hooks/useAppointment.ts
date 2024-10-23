import { Key, useState } from "react"
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCalendarDay, setDate, setLocationAndSpecialty } from "@/store/slices/appointmentSlice";
import { customSwal } from "@/helpers/custom_swal";
import { completeCalendarDays } from "@/helpers/completeCalendarDays";

type OptionsUpdate = "pending" | "active" | "disabled"

interface Item {
	id: number;
	name: string;
	commune: string;
	value: string;
}

interface AppointmentProps {
    specialtyItems?: Item[];
    centerItems?: Item[];
}

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];


export const useAppointment = ({specialtyItems = [], centerItems = []}: AppointmentProps = {} ) => {

    const [ previsionKey, setPrevisionKey ] = useState<Key | null>(null) // patient_information

    const [ specialtySelected, setSpecialtySelected ] = useState<Key>('') // medical_reserve
    const [ specialtyId, setSpecialtyId ] = useState<number>(0) // medical_reserve

    const [ locationSelected, setLocationSelected ] = useState<Key>('') // medical_reserve
    const [ locationId, setLocationId ] = useState<number>(0) // medical_reserve

    const [ startDate, setStartDate ] = useState<Value>(null) // calendar_appointment

    const [ isLoading, setIsLoading ] = useState(false)
    const [ status, setStatus ] = useState<OptionsUpdate>('pending');

    const formattedDate = startDate instanceof Date ? startDate?.toDateString() : ''
    const dateArray = formattedDate ? formattedDate.split(' ') : [];
    const calendarDay = completeCalendarDays(dateArray[0])

    const normalizedItems = (items: Item[], key:Key | null):Item | undefined => {
        return items.find( (item) => (item.id === Number(key) ))
    }

    const router = useRouter()
    const dispatch = useDispatch()

    const handleSpecialty = (key: Key | null) => {
        setIsLoading(true);
    
        const data = normalizedItems(specialtyItems!, key);
    
        if (!data) {
            console.error("No se encontró ninguna especialidad con la clave proporcionada");
            setIsLoading(false);
            return; 
        }
    
        setSpecialtyId(data.id);
        setSpecialtySelected(data.name);
        setIsLoading(false);
    };
    

    const handleLocation = (key: Key | null) => {
        setIsLoading(true);
        
        const data = normalizedItems(centerItems!, key);
        if (!data) {
            console.error("Error: No se encontraron datos válidos");
            setIsLoading(false);
            return;
        }
    
        setLocationId(data.id);
        setLocationSelected(data.commune);
    
        setIsLoading(false);
    };

    const handlePrevision = (key: Key | null) => {
        setIsLoading(true)
        setPrevisionKey(key)
        setIsLoading(false)
    }

    const handleLocationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            dispatch(setLocationAndSpecialty({
                specialty: specialtySelected,
                specialtyId: specialtyId,
                center: locationSelected,
                centerId: locationId
            }));
            setTimeout(() => {
                router.push('/medical_consultation/calendar_appointment');
                setIsLoading(false);
            }, 1000);

        } catch (error) {
            console.error("Error al manejar la ubicación y especialidad:", error);
            setIsLoading(false);

        }
    };

    const handleCalendarSubmit = () => {
        setIsLoading(true);
    
        if (!(startDate instanceof Date)) {
            console.error("startDate no es una fecha válida");
            setIsLoading(false);
            return;
        }
    
        if (typeof startDate === 'object') {
            const isoDate = startDate.toISOString();
            dispatch(setDate({ date: isoDate }));
        }
        
        dispatch(setCalendarDay({ day: calendarDay! }));
        setTimeout(() => {
            router.push('/medical_consultation/professionals');
            setIsLoading(false);
        }, 1000);
    };
    

    const confirmAppointment = () => {
        setStatus("active")
        customSwal({
            title: "Cita confirmada con éxito",
            error: "success"
        })
    }

    const cancelAppointment = () => {
        setStatus("disabled")
        customSwal({
            title: "Cita cancelada con éxito",
            error: "success"
        })
    }

    return {
        previsionKey,
        setPrevisionKey,
        handlePrevision,
        specialtySelected,
        locationSelected,
        handleSpecialty,
        handleLocation,
        handleLocationSubmit,
        handleCalendarSubmit,
        dateArray,
        startDate,
        setStartDate,
        isLoading,
        status,
        confirmAppointment,
        cancelAppointment
    }
}