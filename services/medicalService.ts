import { useEffect, useState } from "react"
import axiosClient from "@/utils/axios.client"

interface Specialty {
    id: number;
    name: string;
}

interface Professional {
    id: number;
    name: string;
    lastName: string;
    specialty: Specialty; 
}


const cache: { [key:string]: any } = {}

const fetchFromCacheOrApi = async(url:string) => {
    if (cache[url]) {
        return cache[url];
    }
    const response = await axiosClient.get(url);
    cache[url] = response.data;
    return response.data;
}

export const useMedicalData = () => {

    const [ specialty, setSpecialty ] = useState([])
    const [ center, setCenter ] = useState([])
    const [ prevision, setPrevision ] = useState([])
    // const [ profesionals, setProfesionals ] = useState<Professional[]>([])
    const [ isLoading, setIsLoading ] = useState(false)

    useEffect(() => {
        
        const fetchData = async() => {

            setIsLoading(true)

            try {
                const [ specialtiesData, centerData, previsionData ] = await Promise.all([
                    fetchFromCacheOrApi('/specialty'),
                    fetchFromCacheOrApi('/medical-center'),
                    fetchFromCacheOrApi('/previsions'),
                    // fetchFromCacheOrApi('/doctor')
                ])

                setSpecialty(specialtiesData)
                setCenter(centerData)
                setPrevision(previsionData)
                // setProfesionals(doctorData)

                setIsLoading(false)
            } catch (error) {
                console.log({"Error fetching data": error})
            }
        }

        fetchData()

    }, [])
      

    return {
        specialty,
        center,
        prevision,
        // profesionals,
        isLoading
    }
}