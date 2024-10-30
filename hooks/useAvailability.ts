import { useEffect, useState } from "react";
import { time } from "@/components/common/Select/data";
import * as Yup from 'yup';
import { userContext } from "@/context/user.context";
import { customSwal } from "@/helpers/custom_swal";

interface Time {
    day: string[];
    time: string[];
}

export const useAvailability = ({createAvailability}: {createAvailability?: any}) => {

  	const [ displayAvailability, setDisplayAvailability ] = useState(false);
  	const [ selectedDays, setSelectedDays ] = useState<string[]>([]);
	const [ refreshKey, setRefreshKey ] = useState(0);

	const [ firstValue, setFirstValue ] = useState<string>('')
	const [ secondValue, setSecondValue ] = useState<string>('')
    const [ dataTime, setDataTime ] = useState<Time[]>([])

    const [ arrayTime, setArrayTime ] = useState<string[]>([])
	const [ error, setError ] = useState<Partial<Record<string, string>>>({})

	const { user, setIsLoading } = userContext()

	const validationSchema = Yup.object({
		selectedDays: Yup.array()
			.of(Yup.string())
			.min(4, "Debe seleccionar al menos 4 días"),
		arrayTime: Yup.array()
			.of(Yup.string())
			.min(2, "Debe seleccionar 2 horas"),
	});


	useEffect(() => {
		
		if (firstValue && secondValue) {
			const updatedArrayTime = [firstValue, secondValue];
            const newEntries = selectedDays.map(day => ({
                day: [day],
                time: updatedArrayTime
            }));
    
            setDataTime( () => {
				const updatedData = [...newEntries];
				return updatedData;
			});
        }

	}, [selectedDays, firstValue, secondValue]);

	useEffect(() => {
        
		if (selectedDays.length > 0) {
			setError(prev => ({ ...prev, selectedDays: '' }));
		}
		
		if (arrayTime.length > 0) {
			setError(prev => ({ ...prev, arrayTime: '' }));
		}
		
    }, [selectedDays.length, arrayTime.length])

	const submitForm = async(e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();	
		setIsLoading(true)

		const doctorId = user?.id

		try {

			await validationSchema.validate({ selectedDays, arrayTime }, { abortEarly: false });
			await createAvailability({selectedDays, firstValue, secondValue, doctorId})

			customSwal({
				title: "¡Disponibilidad registrada con éxito!",
				error: 'success'
			})
			setIsLoading(false)

		} catch (error) {
			setIsLoading(false)
			if (error instanceof Yup.ValidationError) {
				const newErrors: Record<string, string> = {};
				error.inner.forEach(err => {
					if (err.path) {
						newErrors[err.path] = err.message;
						console.log(err.path)
					}
				});
				setError(newErrors);
			} else {
				console.error('Error en el formulario:', error);
			}
		}
	};


  	const handleChange = (isChecked: boolean, day: string) => {

		  if (isChecked) {
			setSelectedDays([ ...selectedDays, day]);
    	} else {
      		setSelectedDays(selectedDays.filter((d) => d !== day));
    	}
	};


	const handleSelcted = ({e, selectId}: {e: any, selectId: number}) => {

		let arrayTime: string[] = [];
		const value = e.target.value;
		
		if (value && selectId === 1) {
		  	setFirstValue(value);
		  	arrayTime = [value];
		}

		if (value && selectId === 2) {
            setSecondValue(value);
            arrayTime = [firstValue, value]; 
			setArrayTime(arrayTime)
		}
        
        if (value === '') {
            setFirstValue('')
        }

	};	

	const cleanSelected = () => {
		setFirstValue('');
		setSecondValue('');
		setSelectedDays([]);
		setArrayTime([]);
		setRefreshKey(prev => prev + 1);
	};

  	return {
		displayAvailability,
		setDisplayAvailability,
		submitForm,
		handleChange,
		dataTime,
		firstValue,
		time,
		handleSelcted,
		cleanSelected,
		selectedDays,
		error,
		refreshKey
  	};
};
