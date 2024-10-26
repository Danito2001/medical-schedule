import { useEffect, useState } from "react"
import { customSwal } from "@/helpers/custom_swal";
import axiosClient from "@/utils/axios.client"


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
    const [ isLoading, setIsLoading ] = useState(false)

    useEffect(() => {
        
        const fetchData = async() => {

            setIsLoading(true)

            try {
                const [ specialtiesData, centerData, previsionData ] = await Promise.all([
                    fetchFromCacheOrApi('/specialty'),
                    fetchFromCacheOrApi('/medical-center'),
                    fetchFromCacheOrApi('/previsions'),
                ])

                setSpecialty(specialtiesData)
                setCenter(centerData)
                setPrevision(previsionData)

                setIsLoading(false)
            } catch (error) {
                console.log({"Error fetching data": error})
                customSwal({
                    title: "No fue posible obtener datos del sistema",
                    text: "Por favor, recargue la pagina",
                    error: "error"
                })
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