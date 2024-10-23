import { Key } from "react";

interface Specialty {
    id: number;
    name: string;
}

interface Center {
    id: number;
    commune: string;
}


export const formattedDate = (date:Date | null | string):string => {
    
    if (!date) return 'Fecha no disponible';

    const dateObj = typeof date === 'string' ? new Date(date) : date;

    return dateObj?.toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).replace(',', '')
}

export const formattedTime = (time: Date) => {

    return time.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
}

export const specialtys = [
    { key: 'Cardiology', value: 'Cardiología' },
    { key: 'Neurology', value: 'Neurología' },
    { key: 'Dermatology', value: 'Dermatología' },
    { key: 'Pediatrics', value: 'Pediatría' },
    { key: 'Orthopedics', value: 'Ortopedia' },
    { key: 'Gynecology', value: 'Ginecología' }
];


export const medicalCenter = [
    { key: 'las_condes', value: 'Las Condes' },
    { key: 'la_reina', value: 'La Reina' },
    { key: 'ñuñoa', value: 'Ñuñoa' },
    { key: 'providencia', value: 'Providencia' },
    { key: 'peñalolen', value: 'Peñalolen' },
    { key: 'santiago', value: 'Santiago' }
];

export const formattedCenter = (entry: string | Key) => {

    const matchedItem = medicalCenter.find( i => i.key === entry)

    return matchedItem?.value;
}

export const formattedSpecialty = (entry: string | Key) => {

    const matchedItem = specialtys.find( i => i.key === entry)

    return matchedItem?.value;
}

export const formattedArraySpecialty = (specialty: Specialty[]) => {
    let newArray:any[] = [];
    specialty.forEach(s => {
        const matchedSpecialty = specialtys.find(sp => sp.key === s.name);
        if (matchedSpecialty) {
            newArray.push({id: s.id, key: matchedSpecialty.key, value: matchedSpecialty.value})
        }
    });

    return newArray;
}

export const formattedArrayCenter = (center: Center[]) => {
    let newArray:any[] = [];
    center.forEach(c => {
        const matchedCenter = medicalCenter.find(mc => mc.key === c.commune);
        if (matchedCenter) {
            newArray.push({id: c.id, key: matchedCenter.key, commune: matchedCenter.value})
        }
    });

    return newArray;
}