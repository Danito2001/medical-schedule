'use client'

import { useCallback, useState } from 'react';

import Sidebar from "@/components/private/Sidebar/Sidebar";
import Patient from '@/components/private/Patient/Patient';
import Availability from '@/components/private/Availability/Availability';

type Options = "patient" | "availability"

export default function Dashboard() {

    const [ currentSection, setCurrentSection ] = useState<Options>("patient")

    const handlePatient = useCallback(() => {setCurrentSection("patient")}, [])
    const handleAvailability = useCallback(() => {setCurrentSection("availability")}, [])

    
    const renderedSections = () => {
        switch (currentSection) {
            case "patient":
                return <Patient/>
            
            case "availability":
                return <Availability/>
            default:
                break;
        }
    }
    
    return (
        <>
            <Sidebar 
                currentSection={currentSection}
                onPatient={handlePatient}
                onAvailability={handleAvailability}
            />
            <div className="px-4 lg:pl-[200px] lg:px-20">
                {renderedSections()}    
            </div>
        </>
    )
}