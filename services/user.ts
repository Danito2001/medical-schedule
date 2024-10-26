import { useRouter } from "next/navigation";
import { userContext } from "@/context/user.context";
import axiosClient from "@/utils/axios.client"

interface CreateProps {
    firstValue: string;
    secondValue: string;
    selectedDays: string[];
    doctorId: number;
}

export const userService = () => {

    const router = useRouter();

	const { user, setUser, setIsLoading, setIsDataLoading } = userContext()

    const login = async ({ email, password }: { email: string, password: string }) => {
		return await axiosClient.post('/login', { email, password })
			.then((response) => {
				const { user } = response.data
				setUser(user)
				setIsLoading(false)
				router.push('/dashboard');
			})
			.catch((error:any) => {
                console.log(error?.response?.data?.message || error.message)
				throw error;
			});
	};

	const logout = async() => {
		if (user) {
			try {
				await axiosClient.post('/logout')
				setUser(null)
				router.push("/auth/login");
			} catch (error:any) {
				console.log(error?.response?.data?.message || error.message)
			}
		}
	}

	const handleShowAvailability = async() => {

        if ( !user ) return;

        try {

			await axiosClient.get('/get-availability', {
				params: {
					id: user.id
				}   
			})

			setIsLoading(false)
			
        } catch (error:any) {
			console.log(error?.response?.data?.message || error.message)
        }
    }
	
	const createAvailability = async({firstValue, secondValue, selectedDays, doctorId}: CreateProps) => {

        if ( !user ) return;

        try {
			  
			const response = await axiosClient.post('/availability', {
				startTime: firstValue, 
				endTime: secondValue, 
				days: selectedDays,
				doctorId: doctorId
			})

			const { startDateTime, endDateTime, days } = response.data;
			
			setUser({
				...user,
				DoctorAvailability: {
					...user.DoctorAvailability,
					startDateTime: startDateTime,
					endDateTime: endDateTime,
					days: days
				},
			});

			handleShowAvailability()

		} catch (error:any) {
			console.log(error?.response?.data?.message || error.message)
		}
    }

	
	const handleUpdatePatients = async() => {

		if ( !user ) return;

		setIsDataLoading(true)

		try {
            const { id } = user;
			
			const response = await axiosClient.get('/patients', {
				params: {
					id: id
				}
			})
			const { appointment } = response.data;

			setUser({
				...user,
				appointment
			})

			setIsDataLoading(false)

		} catch (error:any) {
			console.log(error?.response?.data?.message || error.message)
        }
	}

	return {
		login,
		logout,
		createAvailability,
		handleUpdatePatients
	}
}